function exportSRsWithTitlesToCSV() {
    const tables = document.querySelectorAll('table'); // Get all tables on the page
    let csvContent = "Entity, Category,Title,Article ID,Path,Type,Area,Sub Area,TAT,Contigency\n"; // CSV header

    tables.forEach((table) => {
        
        // Check if the table contains headers that match the required patterns
        const headers = Array.from(table.querySelectorAll('thead tr td')).map(header =>
            header.textContent.trim().toLowerCase()
        );

        const hasType = headers.some(header => /(?:^|\s)(request type|sr type|type)(?:\s|$)/.test(header));
        const hasArea = headers.some(header => /(?:^|\s)(area|sr area|sr sub type)(?:\s|$)/.test(header));
        const hasSubArea = headers.some(header => /(?:^|\s)(sub area|sr sub type|sr sub sub type)(?:\s|$)/.test(header));

        if (!hasType || !hasArea || !hasSubArea) {
            return; // Skip this table if the required headers are not present
        }

        console.log(headers)
        // Find the nearest title associated with the table
        let title = "Unknown Title";
        let articleId = "Unknown ID";
        let articleCategory = "Unknown Category";
        let currentElement = table;

        // Traverse up the DOM to find the <dt> with "Title" and its associated <dd>
        while (currentElement) {
            const dtElements = currentElement.querySelectorAll('dt');
            for (const dt of dtElements) {
                if (dt.textContent.trim().toLowerCase() === "title") {
                    const ddElement = dt.nextElementSibling;
                    if (ddElement && ddElement.tagName === "DD") {
                        title = ddElement.textContent.trim();
                        break;
                    }
                }
            }
            if (title !== "Unknown Title") break; // Stop if title is found
            currentElement = currentElement.parentElement; // Move up in the DOM
        }

        // Traverse up the DOM to find the <dt> with "ID" and its associated <dd>
        while (currentElement) {
            const dtElements = currentElement.querySelectorAll('dt');
            for (const dt of dtElements) {
                if (dt.textContent.trim().toLowerCase() === "id") {
                    const ddElement = dt.nextElementSibling;
                    if (ddElement && ddElement.tagName === "DD") {
                        articleId = ddElement.textContent.trim();
                        break;
                    }
                }
            }
            if (articleId !== "Unknown ID") break; // Stop if ID is found
            currentElement = currentElement.parentElement; // Move up in the DOM
        }

        // Traverse up the DOM to find the <dt> with "Location" and its associated <dd>
        while (currentElement) {
            const dtElements = currentElement.querySelectorAll('dt');
            for (const dt of dtElements) {
                if (dt.textContent.trim().toLowerCase() === "location") {
                    const ddElement = dt.nextElementSibling;
                    if (ddElement && ddElement.tagName === "DD") {
                        articleCategory = ddElement.textContent.trim();
                        break;
                    }
                }
            }
            if (articleCategory !== "Unknown Category") break; // Stop if category is found
            currentElement = currentElement.parentElement; // Move up in the DOM
        }

        let cleanArticleCatgory = extractKey(articleCategory)
        let entity = cleanArticleCatgory.split("_")[0];
        let articleURL = `https://askkmpro.sso.verint-km.com/enterprise/${entity}/${cleanArticleCatgory}/${articleId}`;
        // Extract rows from the current table
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const rowData = Array.from(cells).map(cell => cell.textContent.trim());
                csvContent += [entity, cleanArticleCatgory, title.replace(/\s*,\s*|\s+,/g, '/'), articleId, articleURL, ...rowData].join(",") + "\n";
            }
        });
    });

    // REGEX Function to extract the category key
    function extractKey(input) {
        // Regex to match the part after "enbd:" and before the first space or parenthesis
        const match = input.match(/enbd:([\w_]+)/);
        return match ? match[1] : null; // Return the matched group or null if no match
    }

    // Create a Blob and download the CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'serviceRequestsWithTitles.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Call the function
exportSRsWithTitlesToCSV();