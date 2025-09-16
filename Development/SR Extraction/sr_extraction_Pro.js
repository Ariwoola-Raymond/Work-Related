
/** =========================
 *  CONFIG
 *  ========================= */
const REUSE_CONTINGENCY_FOR_SCENARIO = true; // true => put Scenario text into "Contingency" column; false => add a separate "Scenario" column

/** =========================
 *  MAIN
 *  ========================= */
async function processFiles() {
  const fileInput = document.getElementById('fileInput');
  const files = fileInput?.files || [];
  if (!files.length) { alert('Please select files to process'); return; }

  // Core SR columns from the table (we'll map to these)
  const EXPECTED_DATA_COLUMNS = 5; // Type, Area, Sub Area, TAT, Contingency (or Scenario if reused)

  // Compose CSV header
  let headerCols = [
    "Entity","Category","Title","Article_ID","Path",
    "Type","Area","Sub Area","TAT",
    REUSE_CONTINGENCY_FOR_SCENARIO ? "Contingency" : "Contingency","Scenario",
    "NewSRTemplate","IsFlagged"
  ];
  if (REUSE_CONTINGENCY_FOR_SCENARIO) {
    // When reusing Contingency, drop explicit Scenario column
    headerCols = headerCols.filter(h => h !== "Scenario");
  }

  // Prepend UTF-8 BOM so that Excel auto-detects UTF-8 instead of guessing ANSI
  let csv = '\uFEFF' + headerCols.join(",") + "\n";

  for (const file of files) {
    const html = await readFile(file);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const tables = doc.querySelectorAll("table");
    tables.forEach(table => {
      // Basic flagging rule (keep your semantics)
      const isFlagged = table.classList.contains("serviceRequest") ? "YES" : "NO";

      // ---------- METADATA (Title / ID / Location-Category) ----------
      const title = findMetaNearby(table, "title") || "Unknown Title";
      const articleId = findMetaNearby(table, "id") || "Unknown ID";
      const articleCategory = findMetaNearby(table, "location") || "Unknown Category";
      const cleanArticleCategory = extractKey(articleCategory) ?? articleCategory;
      const entity = (cleanArticleCategory.split("_")[0] || "").trim();
      const articleURL = `https://askkmpro.sso.verint-km.com/enterprise/${entity}/${cleanArticleCategory}/${articleId}`;

      // ---------- HEADER MAPPING ----------
      // Try mapping by a header row; if none, infer via heuristics
      const map = buildColumnMap(table);

      if (!map) return; // nothing usable

      // Gather rows (support tables that lack <tbody>)
      const bodyRows = table.querySelectorAll("tbody tr");
      const rows = bodyRows.length ? bodyRows : table.querySelectorAll("tr");

      // Validate that some rows have enough cells
      if (![...rows].some(tr => tr.querySelectorAll("td").length >= map.minCellsNeeded)) return;

      rows.forEach(tr => {
        const tds = tr.querySelectorAll("td");
        if (!tds.length) return;

        const pick = (idx) => {
          const td = tds[idx];
          return td ? normalizeCell(td) : "";
        };

        // Extract core SR fields with safety
        const type    = safePick(pick, map.idx.type);
        const area    = safePick(pick, map.idx.area);
        const subArea = safePick(pick, map.idx.subArea);
        const tat     = safePick(pick, map.idx.tat);

        // Scenario handling
        let scenario = "";
        if (map.idx.scenario != null) {
          scenario = safePick(pick, map.idx.scenario);
        } else if (map.offsetScenario && tds.length > 0) {
          // Heuristic: first column looked like Scenario
          scenario = normalizeCell(tds[0]);
        }

        // Contingency (if a real column exists)
        let contingency = "";
        if (map.idx.contingency != null) contingency = safePick(pick, map.idx.contingency);

        // Optionally reuse Contingency to carry Scenario
        let contingencyOut = contingency;
        let scenarioOut = scenario;
        if (REUSE_CONTINGENCY_FOR_SCENARIO) {
          contingencyOut = scenario || contingency; // prefer scenario text if present
          scenarioOut = undefined; // not emitted
        }

        // New SR Template detection (by mapped header or heuristics per row)
        let newSrTemplate = "";
        if (map.idx.newSrTemplate != null) {
          newSrTemplate = safePick(pick, map.idx.newSrTemplate);
        } else {
          newSrTemplate = detectTemplateCell(tr) || "";
        }

        // Skip obviously empty SR rows (no core fields)
        if (!type && !area && !subArea && !tat && !contingencyOut && !scenarioOut && !newSrTemplate) return;

        // Title path normalization
        const titlePath = (title || "").replace(/\s*-\s*/g, "/").replace(/\s+/g, " ").trim();

        // Build CSV row
        const base = [
          entity,
          cleanArticleCategory,
          titlePath,
          articleId,
          articleURL,
          type,
          area,
          subArea,
          tat
        ];

        if (REUSE_CONTINGENCY_FOR_SCENARIO) {
          base.push(contingencyOut);
        } else {
          base.push(contingency);     // Contingency column (often blank)
          base.push(scenarioOut || ""); // Separate Scenario column
        }

        base.push(newSrTemplate);
        base.push(isFlagged);

        csv += base.map(v => csvEscape(sanitizeForExcel(v))).join(",") + "\n";
      });
    });
  }

  downloadCSV(csv);
}

/** =========================
 *  COLUMN MAPPING & HEURISTICS
 *  ========================= */
function buildColumnMap(table) {
  // Collect a candidate header row: thead if present, else first row if it looks header-ish
  const theadCells = table.querySelectorAll("thead tr th, thead tr td");
  let headerCells = theadCells.length ? theadCells : null;

  if (!headerCells) {
    const firstRow = table.querySelector("tr");
    if (firstRow) {
      const cells = firstRow.querySelectorAll("td,th");
      if (rowLooksLikeHeader(cells)) headerCells = cells;
    }
  }

  const want = {
    type:        /(^(request\s*)?type$)|(^type$)/i,
    area:        /^area$/i,
    subArea:     /^(sub[\s-]*area|sub[\s-]*type)$/i,
    tat:         /^tat$/i,
    contingency: /^contingency$/i,
    scenario:    /^scenario$/i,
    newSrTemplate: /(new\s*sr\s*template|new\s*service\s*request\s*template|^template$)/i
  };

  const idx = {
    type: null,
    area: null,
    subArea: null,
    tat: null,
    contingency: null,
    scenario: null,
    newSrTemplate: null
  };

  if (headerCells) {
    [...headerCells].forEach((cell, i) => {
      const t = normalizeText(cell.textContent);
      if (want.type.test(t)) idx.type = i;
      else if (want.area.test(t)) idx.area = i;
      else if (want.subArea.test(t)) idx.subArea = i;
      else if (want.tat.test(t)) idx.tat = i;
      else if (want.contingency.test(t)) idx.contingency = i;
      else if (want.scenario.test(t)) idx.scenario = i;
      else if (want.newSrTemplate.test(t)) idx.newSrTemplate = i;
    });
  }

  // If core fields aren’t mapped, infer by offset (skip Scenario-like first col)
  let offsetScenario = false;
  if (idx.type == null || idx.area == null || idx.subArea == null) {
    const bodyRows = table.querySelectorAll("tbody tr");
    const rows = bodyRows.length ? bodyRows : table.querySelectorAll("tr");
    if (rows.length) {
      const firstCells = rows[0].querySelectorAll("td");
      if (firstCells.length >= 4 && looksLikeScenarioCell(normalizeCell(firstCells[0]))) {
        offsetScenario = true;
        idx.type = 0 + 1;
        idx.area = 1 + 1;
        idx.subArea = 2 + 1;
        idx.tat = 3 + 1;
        // leave contingency/newSrTemplate unmapped unless discovered
      } else {
        // Best-effort default positions
        idx.type = idx.type ?? 0;
        idx.area = idx.area ?? 1;
        idx.subArea = idx.subArea ?? 2;
        idx.tat = idx.tat ?? 3;
      }
    }
  }

  // Minimal requirement: have at least Type/Area/SubArea indices
  if (idx.type == null || idx.area == null || idx.subArea == null) return null;

  // Estimate how many cells we need to read
  const neededIdx = Object.values(idx).filter(v => v != null);
  const minCellsNeeded = (neededIdx.length ? Math.max(...neededIdx) : 0) + 1;

  return { idx, offsetScenario, minCellsNeeded };
}

function rowLooksLikeHeader(cells) {
  const texts = [...cells].map(c => normalizeText(c.textContent));
  const score =
    (texts.some(t => /(^(request\s*)?type$)|(^type$)/i.test(t)) ? 1 : 0) +
    (texts.some(t => /^area$/i.test(t)) ? 1 : 0) +
    (texts.some(t => /^(sub[\s-]*area|sub[\s-]*type)$/i.test(t)) ? 1 : 0);
  return score >= 2; // at least two header keywords present
}

function looksLikeScenarioCell(t) {
  if (!t) return false;
  // Heuristics: long sentence-like text (e.g., “Customer is facing an issue …”)
  return t.length > 25 || /\.\s|:|,|\(|\)/.test(t);
}

/** =========================
 *  HELPERS
 *  ========================= */
function extractKey(input) {
  if (!input) return null;
  // try "/endb/<key>" first
  let m = input.match(/\/endb\/([\w-]+)/i);
  if (m) return m[1];
  // then "endb: <key>"
  m = input.match(/endb[:\s]+([\w-]+)/i);
  return m ? m[1] : null;
}

function normalizeText(s) {
  return (s || "")
    .replace(/\u00A0/g, " ")   // NBSP -> space
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeCell(td) {
  // Prefer visible text; fall back to link href if content is empty
  let txt = (td.textContent || "").replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
  if (!txt) {
    const a = td.querySelector("a[href]");
    if (a) txt = a.href || "";
  }
  return txt;
}

function safePick(pickFn, idx) {
  return (idx != null) ? pickFn(idx) : "";
}

function detectTemplateCell(tr) {
  // Look for explicit template mentions or links
  const tds = tr.querySelectorAll("td");
  for (const td of tds) {
    const text = normalizeText(td.textContent);
    if (/template/.test(text)) {
      const link = td.querySelector("a[href]");
      return link ? (link.href || link.textContent || "").trim() : (td.textContent || "").trim();
    }
    const a = td.querySelector("a[href]");
    if (a && /template|\.docx$|\.xlsx$|\.xls$|\.pdf$/i.test(a.href || "")) {
      return a.href;
    }
  }
  return "";
}

function csvEscape(s) {
  s = (s ?? "").toString();
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

// Replace common Unicode punctuation that often appears corrupted (mojibake) in Excel when encoding is mis-detected
// This is defensive; with the BOM Excel should decode correctly, but this keeps output ASCII-friendly.
function sanitizeForExcel(s) {
  if (s == null) return '';
  return s
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'") // curly/single quotes
    .replace(/[\u201C\u201D\u201E]/g, '"')       // curly double quotes
    .replace(/[\u2013\u2014\u2015]/g, '-')       // dashes
    .replace(/\u2022/g, '*')                      // bullet
    .replace(/\u00A0/g, ' ')                      // NBSP
    .replace(/[\u2026]/g, '...')                  // ellipsis
    .replace(/[\u2122]/g, 'TM')                   // trademark
    .replace(/[\u00AE]/g, '(R)')                  // registered
    .replace(/[\u00A9]/g, '(C)');                 // copyright
}

function downloadCSV(content) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "combined_serviceRequests.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsText(file);
  });
}

/** =========================
 *  METADATA SCRAPER (dt/dd up the DOM)
 *  ========================= */
function findMetaNearby(startNode, key) {
  const target = (key || "").toLowerCase();
  let node = startNode;
  let safety = 0;
  while (node && safety++ < 20) {
    const dts = node.querySelectorAll("dt");
    for (const dt of dts) {
      if (normalizeText(dt.textContent) === target) {
        const dd = dt.nextElementSibling;
        if (dd && dd.tagName === "DD") {
          return (dd.textContent || "").replace(/\u00A0/g, " ").replace(/\s+/g, " ").trim();
        }
      }
    }
    node = node.parentElement;
  }
  return null;
}
