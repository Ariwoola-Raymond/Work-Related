// Refactored Card Data (cardData.js)
const cardData = [
    {
      name: "Webshopper Card",
      rewardType: "Plus Points",
      rewardExpiry: "Plus Points balance will never expire as long as card is active",
      rewardCap: "500 Plus Points per billing cycle",
      earningRates: [
        { category: "All Online Spends", rate: 0.005 },
        { category: "Categorized Earning 1", rate: 0.004 },
        { category: "Categorized Earning 2", rate: 0.002 }
      ],
      cardImage: "<img class='cardImage lazy' data-src='/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Webshopper_Front.png'>"
    },
    // Add other cards here in similar fashion
  ];
  
  // UI Handling (uiHandler.js)
  function displayCardDetails(card) {
    const cardDetails = `
      <ul>
        <li>Card Name: <strong>${card.name}</strong></li>
        <li>Reward Type: <strong>${card.rewardType}</strong></li>
        <li>Reward Expiry: <strong>${card.rewardExpiry}</strong></li>
        <li>Reward Cap: <strong>${card.rewardCap}</strong></li>
      </ul>
    `;
    document.querySelector(".selectedCardDescription").innerHTML = cardDetails;
    document.querySelector(".selectedCardImage").innerHTML = card.cardImage;
    lazyLoadImages();
  }
  
  // Lazy Load Images
  function lazyLoadImages() {
    const lazyImages = document.querySelectorAll("img.lazy");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => observer.observe(img));
  }
  
  // Reward Calculation (rewardCalculator.js)
  function calculateRewards(card, transactionAmount) {
    if (!card || isNaN(transactionAmount) || transactionAmount <= 0) {
      return ["Invalid transaction amount or card selection."];
    }
    const results = card.earningRates.map((rate) => {
      const points = transactionAmount * rate.rate;
      return `${rate.category}: ${points.toFixed(2)} ${card.rewardType}`;
    });
    return results;
  }
  
  // Error Handling (errorHandler.js)
  function showError(message) {
    alert(message);
  }
  
  // Event Listeners (eventListeners.js)
  document.getElementById("cardType").addEventListener("change", (e) => {
    const selectedCardName = e.target.value;
    const selectedCard = cardData.find((card) => card.name === selectedCardName);
    if (selectedCard) {
      displayCardDetails(selectedCard);
    }
  });
  
  document.getElementById("submit-button").addEventListener("click", () => {
    const transactionAmount = parseFloat(document.getElementById("txnAmount").value);
    const selectedCardName = document.getElementById("cardType").value;
    const selectedCard = cardData.find((card) => card.name === selectedCardName);
  
    if (selectedCard && !isNaN(transactionAmount) && transactionAmount > 0) {
      showLoadingSpinner(true);
      setTimeout(() => {
        const rewardResults = calculateRewards(selectedCard, transactionAmount);
        const resultsHtml = rewardResults.map((result) => `<p>${result}</p>`).join("");
        document.getElementById("rewardResults").innerHTML = resultsHtml;
        showLoadingSpinner(false);
      }, 1000);
    } else {
      showError("Please select a valid card and enter a valid transaction amount.");
    }
  });
  
  // Input Validation (inputValidator.js)
  document.getElementById("txnAmount").addEventListener("input", (e) => {
    const value = e.target.value;
    if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
      showError("Please enter a valid numeric value.");
      e.target.value = value.slice(0, -1);
    }
  });
  
  // Loading Spinner
  function showLoadingSpinner(show) {
    const spinner = document.getElementById("loadingSpinner");
    if (show) {
      spinner.style.display = "block";
    } else {
      spinner.style.display = "none";
    }
  }
  
  // Responsive Design Enhancements
  window.addEventListener("resize", () => {
    const cardContainer = document.querySelector(".card-container");
    if (window.innerWidth < 768) {
      cardContainer.classList.add("mobile-layout");
    } else {
      cardContainer.classList.remove("mobile-layout");
    }
  });
  