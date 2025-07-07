// script.js

// In-memory container for all cards
const cardProfiles = {};

// Keep track of which card is selected & which currency is active
let selectedCardKey = null;
let activeCurrency = 'AED';

$(document).ready(() => {
  const siteUrl = _spPageContextInfo.webAbsoluteUrl;
  // 1. Fetch both lists, then init UI
  Promise.all([
    fetchCardProfiles(siteUrl),
    fetchCardRates(siteUrl)
  ])
    .then(([profiles, rates]) => {
      buildCardProfiles(profiles, rates);
      populateCardDropdown();
      wireUpEventHandlers();
    })
    .catch(err => {
      console.error(err);
      alert('Unable to load card data. Please try again later.');
    });
});

//
// 1. Fetch Card Profiles
//
function fetchCardProfiles(siteUrl) {
  const url = `${siteUrl}/_api/web/lists/getbytitle('Card Profiles')/items` +
    "?$select=Id,Title,RewardType,CardImageUrl,Currency,ConversionRate,RewardExpiry,RewardCap,ExampleText,SortOrder,Active" +
    "&$orderby=SortOrder";
  return fetch(url, {
    headers: { "Accept": "application/json;odata=nometadata" }
  }).then(r => r.json()).then(r => r.value);
}

//
// 2. Fetch Card Reward Rates (with lookup to profiles)
//
function fetchCardRates(siteUrl) {
  const url = `${siteUrl}/_api/web/lists/getbytitle('Card Reward Rates')/items` +
    "?$select=CardProfile/Id,CardProfile/Title,SpendCategory,EarningRatePercent,EarningRateDisplay,ExampleText,CapDetail,SortOrder" +
    "&$expand=CardProfile" +
    "&$orderby=CardProfile/Id,SortOrder";
  return fetch(url, {
    headers: { "Accept": "application/json;odata=nometadata" }
  }).then(r => r.json()).then(r => r.value);
}

//
// 3. Build combined cardProfiles object
//
function buildCardProfiles(profiles, rates) {
  // Initialize each profile
  profiles.forEach(p => {
    if (!p.Active) return;               // skip disabled cards
    cardProfiles[p.Title] = {
      id:            p.Id,
      name:          p.Title,
      rewardType:    p.RewardType,
      cardImage:     `<img src="${p.CardImageUrl}" alt="${p.Title}" class="img-fluid" />`,
      currency:      p.Currency,
      conversionRate:p.ConversionRate,
      rewardExpiry:  p.RewardExpiry,
      rewardCap:     p.RewardCap,
      exampleGlobal:p.ExampleText,
      spendType:     [],
      earningRatePercent: [],
      earningRateDisplay: [],
      example:       [],
      capDetail:     []
    };
  });

  // Attach rates to their parent profiles
  rates.forEach(r => {
    const key = r.CardProfile.Title;
    const prof = cardProfiles[key];
    if (!prof) return; // rate for disabled/unknown card
    prof.spendType.push(r.SpendCategory);
    prof.earningRatePercent.push(r.EarningRatePercent);
    prof.earningRateDisplay.push(r.EarningRateDisplay);
    prof.example.push(r.ExampleText);
    prof.capDetail.push(r.CapDetail);
  });
}

//
// 4. Populate the <select> with card names
//
function populateCardDropdown() {
  const $sel = $('#cardType').empty().append('<option value="">-- select a card --</option>');
  Object.values(cardProfiles).forEach(p => {
    $sel.append(`<option value="${p.name}">${p.name}</option>`);
  });
}

//
// 5. Set up handlers for select, calculate, currency toggle
//
function wireUpEventHandlers() {
  $('#cardType').on('change', function() {
    selectedCardKey = $(this).val();
    if (selectedCardKey) {
      $('#SeeCardDetails').show();
      activeCurrency = cardProfiles[selectedCardKey].currency;
      $('#transactionAmount').text(activeCurrency);
    } else {
      $('#SeeCardDetails').hide();
    }
  });

  $('#SeeCardDetails').on('click', loadCardDetails);
  $('#submit-button').on('click', calculateRewards);
  $('#txnAmount').on('keypress', e => {
    if (e.which === 13) calculateRewards();
  });

  $('#SwitchCurrency').on('click', () => {
    if (!selectedCardKey) return;
    // toggle currency
    activeCurrency = (activeCurrency === 'AED' ? 'USD' : 'AED');
    $('#transactionAmount').text(activeCurrency);
  });
}

//
// 6. Render card details modal
//
function loadCardDetails() {
  const prof = cardProfiles[selectedCardKey];
  $('#cardDescription .modal-title').text(prof.name);
  $('#cardDescription .card-img-container').html(prof.cardImage);
  $('#cardDescription .expiry-info').text(prof.rewardExpiry);
  $('#cardDescription .cap-info').text(prof.rewardCap || '—');

  // build table body
  const $tbody = $('#tableBody').empty();
  prof.spendType.forEach((cat, i) => {
    $tbody.append(`
      <tr>
        <td>${cat}</td>
        <td>${prof.earningRateDisplay[i]}</td>
        <td>${prof.example[i]}</td>
        <td class="points-earned" id="pointsEarned${i}">—</td>
      </tr>`);
  });

  $('#cardDescription').modal('show');
}

//
// 7. Calculate points for each row
//
function calculateRewards() {
  if (!selectedCardKey) return alert('Please select a card first.');
  const prof = cardProfiles[selectedCardKey];
  const rawAmt = parseFloat($('#txnAmount').val());
  if (isNaN(rawAmt) || rawAmt <= 0) return alert('Enter a valid transaction amount.');

  // convert if needed
  const calcAmt = (activeCurrency === 'USD')
    ? (rawAmt / prof.conversionRate)
    : rawAmt;

  prof.earningRatePercent.forEach((rate, i) => {
    const pts = (calcAmt * rate).toFixed(2);
    $(`#pointsEarned${i}`).text(pts);
  });

  $('#cardDescription').modal('show');
}
