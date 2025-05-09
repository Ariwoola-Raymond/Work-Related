$(document).ready(function () {
    /* *********************************************** *\
    The below section includes the calculator APP
    Author: Oluwatobiloba Raymond Ariwoola ðŸ˜Ž
    \* *********************************************** */
    let selectedCard;
    let cardProfile;
    let currency = "AED";

    // create modal object
    const myModal = new bootstrap.Modal(document.getElementById('cardDescription'), {
        keyboard: false
    });
    const howToUseCalculator = new bootstrap.Modal(document.getElementById('howToUseCalcModal'), {
        keyboard: false
    });
    const feedbackSuggForm = new bootstrap.Modal(document.getElementById('feedbackForm'), {
        keyboard: false
    });
    // const statistics = new bootstrap.Modal(document.getElementById('statData'), {
    //     keyboard: false
    // });
    // feedbackSuggForm.show();


    // Declaration of various reward types and Exipy details
    const pPoints = {
        rewardName: "Plus Points",
        expiryDetails: "Plus Points balance will never expire as long as card is active"
    };
    const uPoints = {
        rewardName: "uPoints",
        expiryDetails: "â€‹Subject to the T&Câ€™s of U By Emaar"
    };
    const dPoints = {
        rewardName: "Dnata Points",
        expiryDetails: "All Dnata Points earned are evergreen and do not expire"
    };
    const rPoints = {
        rewardName: "Red Points",
        expiryDetails: "All points earned are valid for 3 years from the date of accrual"
    };
    const skyMiles = {
        rewardName: "Skywards Miles",
        expiryDetails: "3 years from date of transfer"
    };
    const starPoints = {
        rewardName: "Marriott Bonvoy Points",
        expiryDetails: "Subject to the T&Câ€™s of Marriottâ€‹"
    };
    const luluPoints = {
        rewardName: "Lulu Points",
        expiryDetails: "All lulu Points earned are evergreen and do not expire.â€‹"
    };
    const noonCredits = {
        rewardName: "noon credits",
        expiryDetails: "Noon credits have an expiry period of 5 years from the date of creditâ€‹"
    };
    const etihadMiles = {
        rewardName: "Etihad Miles",
        expiryDetails: 'Refer customer to Etihad Guest Terms & Conditions. <a href="https://www.etihadguest.com/en/terms-and-conditions.htmlâ€‹" target="_blank">https://www.etihadguest.com/en/terms-and-conditions.htmlâ€‹</a>' //! Add html elements
    };
    const DarnaPoints = {
        rewardName: "Darna Points",
        expiryDetails: "Darna Points have an expiry period of 2 years from the date of credit",
        notes: "<i style='color: red;'>Customer can get up to 3.6% additional Darna points on their spends within the Aldar ecosystem, which will appear on their Darna app. However, Emirates NBD will not be able to control the credit/debit of these points. In case of dispute, customer to contact Darna Loyalty customer care.</i>"
    };



    // create card objects
    const webshopperCard = {
        name: "Webshopper",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Webshopper_Front.png">',
        spendType: ['All Online Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['0.5%', '0.4%', '0.2%'],
        example: ['AED 200Â â†’â€‹â€‹Â 1 Plus Point', 'AED 1000Â â†’Â 4Â Plus Points', 'AED 1000 â†’Â 2Â Plus Points'],
        earningRatePercent: [0.005, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "500 Plus Points per billing cycle"
    };
    const ubeFamily = {
        name: "U by Emaar Family",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/emaar-visa-family-bottom.png">',
        spendType: ['Domestic and International Retail (base Spends)', 'Spends at Emaar', 'Emaar Hospitality (Bonus)', 'Emaar Entertainment (Bonus)', ' Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Petroleum</li><li>Government Services</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['10%', '50%', '10% of Emaar Spends', '5% of Emaar Spends', '25% of Base Spends', '10% of Base Spends'],
        example: ['AED 100 â†’Â 10 uPoints', 'AED 100 â†’Â 50 uPoints', 'AED 100 â†’ 50 uPoint Spend at Emaar (50%) + 5 uPoints Additional (10% of 50%)', 'AED 100 â†’ 50 uPoint Spend at Emaar (50%) + 2.5 uPoints Additional (5% of 50%)', 'AED 100Â â†’Â 2.5 uPoints', 'AED 100Â â†’Â 1 uPoint'],
        earningRatePercent: [0.1, 0.5, 0.1, 0.05, 0.25, 0.10],
        rewardExpiry: uPoints.expiryDetails,
        rewardCap: "8,333 uPoints per billing cycle"
    }
    const ubeSignature = {
        name: "U by Emaar Signature",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/emaar-visa-signature-bottom.png">',
        spendType: ['Domestic and International Retail (base Spends)', 'Spends at Emaar', 'Emaar Hospitality (Bonus)', 'Emaar Entertainment (Bonus)', ' Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Petroleum</li><li>Government Services</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['12.5%', '62.5%', '10% of Emaar Spends', '5% of Emaar Spends', '25% of Base Spends', '10% of Base Spends'],
        example: ['AED 100 â†’Â 12.5 uPoints', 'AED 100 â†’Â 62.5 uPoints', 'AED 100 â†’ 62.5 uPoint Spend at Emaar (62.5%) + 6.25 uPoints Additional (10% of 62.5%)', 'AED 100 â†’ 62.5 uPoint Spend at Emaar (62.5%) + 3.125 uPoints Additional (5% of 62.5%)', 'AED 100Â â†’Â 3.125 uPoints', 'AED 100Â â†’Â 1.25 uPoint'],
        earningRatePercent: [0.125, 0.625, 0.1, 0.05, 0.25, 0.10],
        rewardExpiry: uPoints.expiryDetails,
        rewardCap: "16,666 uPoints per billing cycle"
    }
    const ubeInfinite = {
        name: "U by Emaar Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/emaar-visa-infinite-bottom.png">',
        spendType: ['Domestic and International Retail (base Spends)', 'Spends at Emaar', 'Emaar Hospitality (Bonus)', 'Emaar Entertainment (Bonus)', ' Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Petroleum</li><li>Government Services</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['15%', '75%', '10% of Emaar Spends', '5% of Emaar Spends', '25% of Base Spends', '10% of Base Spends'],
        example: ['AED 100 â†’Â 15 uPoints', 'AED 100 â†’Â 75 uPoints', 'AED 100 â†’ 75 uPoint Spend at Emaar (75%) + 7.5 uPoints Additional (10% of 75%)', 'AED 100 â†’ 75 uPoint Spend at Emaar (75%) + 3.75 uPoints Additional (5% of 75%)', 'AED 100Â â†’Â 3.75 uPoints', 'AED 100Â â†’Â 1.5 uPoint'],
        earningRatePercent: [0.15, 0.75, 0.1, 0.05, 0.25, 0.10],
        rewardExpiry: uPoints.expiryDetails,
        rewardCap: "83,333 uPoints per billing cycle"
    }
    const dnataWorldCard = {
        name: "Dnata World",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/dnataWorldCC_bottom_card.png">',
        spendType: ['Domestic & International Spends (base)', 'Spends at Dnata Travel\Dnatatravel.com', 'Spends at Partnered Merchants: Apres, City Sightseeing Dubai, Costa, Giraffe, Imagine Cruising, Left Bank.', 'Spends at Partnered Merchants:Â Al Hamra Cellar, Arabian Adventures, Emirates Holidays, Le Clos, MMI.', 'Duty Free World Wide', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries & UK</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['1.5%', '15%', '15%', '10%', '10%', '25% of Base earning', '10% of Base earning'],
        example: ['AED 100Â â†’Â 1.5 Dnata Points', 'AED 100Â â†’Â 15 Dnata Points', 'AED 100Â â†’Â 15 Dnata Points', 'AED 100Â â†’Â 10 Dnata Points', 'AED 100Â â†’Â 10 Dnata Points', 'AED 100Â â†’Â 0.5 Dnata Points', 'AED 100Â â†’Â 0.2 Dnata Points'],
        earningRatePercent: [0.015, 0.15, 0.15, 0.10, 0.10, 0.25, 0.10],
        rewardExpiry: dPoints.expiryDetails,
        rewardCap: {
            domesticInternational: "3,000 per billing cycle",
            dnataNmerchants: "20,000 per calendar year",
            dutyFree: "200 per billing cycle per billing cycle"
        }
    }
    const dnataPlatinumCard = {
        name: "Dnata Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/dnataPlatinumCC_bottom_card.png">',
        spendType: ['Domestic & International Spends (base)', 'Spends at Dnata Travel\Dnatatravel.com', 'Spends at Partnered Merchants: Apres, City Sightseeing Dubai, Costa, Giraffe, Imagine Cruising, Left Bank.', 'Spends at Partnered Merchants:Â Al Hamra Cellar, Arabian Adventures, Emirates Holidays, Le Clos, MMI.', 'Duty Free World Wide', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries & UK</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['1%', '10%', '15%', '10%', '5%', '25% of Base earning', '10% of Base earning'],
        example: ['AED 100Â â†’Â 1 Dnata Points', 'AED 100Â â†’Â 10 Dnata Points', 'AED 100Â â†’Â 15 Dnata Points', 'AED 100Â â†’Â 10 Dnata Points', 'AED 100Â â†’Â 5 Dnata Points', 'AED 100Â â†’Â 0.375 Dnata Points', 'AED 100Â â†’Â 0.15 Dnata Points'],
        earningRatePercent: [0.01, 0.10, 0.15, 0.10, 0.05, 0.25, 0.10],
        rewardExpiry: dPoints.expiryDetails,
        rewardCap: {
            domesticInternational: "2,000 per billing cycle",
            dnataNmerchants: "15,000 per calendar year",
            dutyFree: "100 per billing cycle per billing cycle"
        }
    }
    const visaFlexi = {
        name: "Visa Flexi",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft flexiCC verticalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/VisaFlexi_cc.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['1.5%', '0.4%', '0.2%'],
        example: ['AED 100Â â†’â€‹â€‹Â 1.5 Plus Point', 'AED 1000Â â†’Â 4Â Plus Points', 'AED 1000 â†’Â 2Â Plus Points'],
        earningRatePercent: [0.015, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const go4itGold = {
        name: "Go4it Gold",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/go4itGold_cc_bottom_card.png">',
        spendType: ['Retail Spends on Weekdays', 'Retail Spends on Weekends<br>(Saturday & Sunday)', 'RTA(Dubai Metro, Dubai Taxi, Tram and ferries)', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['0.25%', '1.25%', '1%', '0.4%', '0.2%'],
        example: ['AED 400 â†’Â 1 Plus Points', 'AED 400 â†’Â 5 Plus Points', 'AED 400 â†’Â 4 Plus Points', 'AED 1000 â†’Â 4 Plus Points', 'AED 1000 â†’Â 2 Plus Points'],
        earningRatePercent: [0.0025, 0.0125, 0.01, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const go4itPlatinum = {
        name: "Go4it Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/go4itPlatinum_cc_bottom_card.png">',
        spendType: ['Retail Spends on Weekdays', 'Retail Spends on Weekends<br>(Saturday & Sunday)', 'RTA(Dubai Metro, Dubai Taxi, Tram and ferries)', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['0.5%', '2.5%', '1%', '0.4%', '0.2%'],
        example: ['AED 200 â†’Â 1 Plus Points', 'AED 200 â†’Â 5 Plus Points', 'AED 200 â†’Â 4 Plus Points', 'AED 1000 â†’Â 4 Plus Points', 'AED 1000 â†’Â 2 Plus Points'],
        earningRatePercent: [0.005, 0.025, 0.02, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "3,000 Plus Points per billing cycle"
    }
    const manUTD = {
        name: "Manchester United Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/manUtdCard_showcase.png">',
        spendType: ['All Retail Spends', 'International Spends', 'Dining Outlets', 'Sports Goods Stores', 'Retail Spends in European Union (EU) Countries', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['100%', '200%', '500%', '1000%', '25% of International Spends', '25% of Retail Spends', '10% of Retail Spends'],
        example: ['1 AEDÂ â†’Â 1 Red Point', '1 AEDÂ â†’Â 2 Red Point', '1 AEDÂ â†’Â 5 Red Point', '1 AEDÂ â†’Â 10 Red Point', '1 AEDÂ â†’Â 0.50 Red Point', '1 AEDÂ â†’Â 0.25 Red Point', '1 AEDÂ â†’Â 0.10 Red Point'],
        earningRatePercent: [1, 2, 5, 10, 0.25, 0.25, 0.10],
        rewardExpiry: rPoints.expiryDetails,
        rewardCap: "50,000 Red Points per billing cycle"
    }
    const dinersClubCard = {
        name: "Diners Club Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/dinersClubCard_showcase.png">',
        spendType: ['Duty Free Spends', 'Dining Spends', 'Domestic and International Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['5%', '2.5%', '0.5%', '0.4%', '0.2%'],
        example: ['AED 100 â†’Â 5 Plus Points', 'AED 100 â†’Â 2.5 Plus Points', 'AED 100 â†’Â 0.5 Plus Points', 'AED 1000 â†’Â 4 Plus Points', 'AED 1000 â†’Â 2 Plus Points'],
        earningRatePercent: [0.05, 0.025, 0.005, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const visaPlatinum = {
        name: "Visa Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/PlatinumCC_bottom_visaCard.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['1.5%', '0.4%', '0.2%'],
        example: ['AED 100Â â†’â€‹â€‹Â 1.5 Plus Point', 'AED 1000Â â†’Â 4Â Plus Points', 'AED 1000 â†’Â 2Â Plus Points'],
        earningRatePercent: [0.015, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const mastercardPlatinum = {
        name: "MasterCard Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/PlatinumCC_bottom_masterCard.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['1.5%', '0.4%', '0.2%'],
        example: ['AED 100Â â†’â€‹â€‹Â 1.5 Plus Point', 'AED 1000Â â†’Â 4Â Plus Points', 'AED 1000 â†’Â 2Â Plus Points'],
        earningRatePercent: [0.015, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const visaInfinite = {
        name: "Visa Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/infinite_cc_bottom_card.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['2%', '0.4%', '0.2%'],
        example: ['AED 100Â â†’â€‹â€‹Â 2 Plus Point', 'AED 1000Â â†’Â 4Â Plus Points', 'AED 1000 â†’Â 2Â Plus Points'],
        earningRatePercent: [0.02, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "3,000 Plus Points per billing cycle"
    }

    const prbvisaInfinite = {
        name: "Priority Banking Visa Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/prb_visa_infinite.png">',
        spendType: ['Retail Transactions below AED 2,500', 'Retail Transactions from AED 2,500 to AED 4,999', 'Retail Transactions of AED 5,000 and above', 'Categorized Earning<ul><li>Spends originating in European Union (EU) countries</li><li>Quick service restaurant (fast-food restaurant)</li><li>Transit</li><li>Government services</li><li>Telecommunication transactions</li><li>Supermarkets and groceries</li><li>Insurance</li><li>Car dealerships</li><li>Fuel</li><li>Utility payments</li><li>Real estate</li><li>Education expenses</li><li>Charity</li></ul>'],
        earningRate: ['1%', '2%', '5%', '1%'],
        example: ['AED 100Â â†’â€‹â€‹Â 1 Plus Point', 'AED 100Â â†’Â 2Â Plus Points', 'AED 100 â†’Â 5Â Plus Points', 'AED 100Â â†’â€‹â€‹Â 1 Plus Point'],
        earningRatePercent: [0.01, 0.02, 0.05, 0.01],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "Plus Points Rewards earned per statement cycle will be capped at 5,000 and maximum of 60,000 Plus Points Rewards can be earned per annum"
    }
    const duoCard = {
        name: "Duo Credit Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/duo_showcase.png">',
        spendType: ['Domestic and International Retail Spends', '<ul><li>Grocery and Supermarkets</li><li>Utility Payments</li><li>Electronics</li><li>Education</li><li>Fuel</li></ul>'],
        earningRate: ['0.5%', '5%'],
        example: ['AED 100Â â†’Â 0.5 Plus Point', 'AED 100Â â†’Â 5 Plus Point'],
        earningRatePercent: [0.005, 0.05],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const skywardsSignature = {
        name: "Skywards Signature",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/skywardsSignatureCC_bottom_card.png">',
        spendType: ['Domestic Retail Spends (Base Miles)', 'International Retail Spends (Non - EU)', 'Emirates.ae, FlyDubai.com spends, Duty free, Online Food Delivery, Car Booking app', 'International Spends (EU) & UK', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['75%', '100%', '150%', '50% of internationalÂ (Non-EU) Earning Rate', '25% of Base Miles', '10% of Base Miles'],
        example: ['USD 1Â â†’Â 0.75 Skywards Miles', 'USD 1Â â†’Â 1 Skywards Miles', 'USD 1Â â†’Â 1.5 Skywards Miles', 'USD 1Â â†’Â 0.50 Skywards Miles', 'USD 1Â â†’Â 0.1875 Skywards Miles', 'USD 1Â â†’Â 0.075 Skywards Miles'],
        earningRatePercent: [0.75, 1, 1.5, 0.5, 0.25, 0.10],
        rewardExpiry: skyMiles.expiryDetails,
        rewardCap: {
            capping: "â€‹Up to credit card limit or AED 50,000 which ever is lower per billing cycle",
            expressMilesCap: "Card does not have Express Miles facility"
        }
    }
    const skywardsInfinite = {
        name: "Skywards Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/skywardsInfiniteCC_bottom_card.png">',
        spendType: ['Domestic Retail Spends (Base Miles)', 'International Retail Spends (Non - EU)', 'Emirates.ae, FlyDubai.com spends, Duty free, Online Food Delivery, Car Booking app', 'International Spends (EU) & UK', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['100%', '150%', '200%', '50% of internationalÂ (Non-EU) Earning Rate', '25% of Base Miles', '10% of Base Miles'],
        example: ['USD 1Â â†’Â 1 Skywards Miles', 'USD 1Â â†’Â 1.5 Skywards Miles', 'USD 1Â â†’Â 2 Skywards Miles', 'USD 1Â â†’Â 0.75 Skywards Miles', 'USD 1Â â†’Â 0.25 Skywards Miles', 'USD 1Â â†’Â 0.10 Skywards Miles'],
        earningRatePercent: [1, 1.5, 2, 0.5, 0.25, 0.10],
        rewardExpiry: skyMiles.expiryDetails,
        rewardCap: {
            capping: "â€‹Up to credit card limit or AED 100,000 which ever is lower per statement",
            expressMilesCap: "Maximum of 4000 miles that can be earned in a statementâ€‹"
        }
    }
    const marriottBonvoy = {
        name: "Marriott Bonvoy",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/marriott_world_world_cc_img.png">',
        spendType: ['Domestic Retail Spends (Base Earning Rate)', 'â€‹International Spends', 'Retail Spends in European Union (EU) Countries', 'Spends at Marriot Properties', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['150%', '150%', '50% of Base rate', 'Up to 3 points per 1 USD <br> 3 Points earned at the time of billing will reflect on the credit card statement', '25% of Base rate', '10% of Base rate'],
        example: ['USD 1 â†’Â 1.5 Points', 'USD 1 â†’Â 1.5 Points', 'USD 1Â â†’ 0.75 Points', 'USD 1 â†’Â Up To 3 Points', 'USD 1 â†’Â 0.375 Points', 'USD 1 â†’Â 0.15 Points'],
        earningRatePercent: [1.5, 1.5, 0.50, 3, 0.25, 0.10],
        rewardExpiry: starPoints.expiryDetails,
        rewardCap: {
            capping: "â€‹Up to credit card limit",
            expressPointCap: "12,000 points per statementâ€‹"
        }
    }

    const marriottBonvoy2 = {
        name: "Marriott Bonvoy World Elite Mastercard",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/marriott_world_elite_cc_img.png">',
        spendType: ['Domestic Retail Spends (Base Earning Rate)', 'â€‹International Spends', 'Retail Spends in European Union (EU) Countries', 'Spends at Marriot Properties', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['300%', '300%', '50% of Base rate', 'Up to 6 points per 1 USD <br> 6 Points earned at the time of billing will reflect on the credit card statement', '25% of Base rate', '10% of Base rate'],
        example: ['USD 1 â†’Â 3 Points', 'USD 1 â†’Â 3 Points', 'USD 1Â â†’ 1.5 Points', 'USD 1 â†’Â Up To 6 Points', 'USD 1 â†’Â 0.75 Points', 'USD 1 â†’Â 0.3 Points'],
        earningRatePercent: [3, 3, 0.50, 6, 0.25, 0.10],
        rewardExpiry: starPoints.expiryDetails,
        rewardCap: {
            capping: "â€‹Up to credit card limit",
            expressPointCap: "12,000 points per statementâ€‹"
        }
    }

    const lulu247Titanium = {
        name: "LuLu 247 Titanium",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft lucardImage verticalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/lulu_titanium_card.png">',
        spendType: ['Utility Spends', 'Fuel Spends', 'LuLu Spends', 'Other Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets except Lulu</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries & UK </li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Real Estate</li><li>Government Services<br><span id="note">(Utility payment done via DubaiÂ Smart GovernmentÂ will notÂ earnÂ points for utility spendÂ because it\'s classified as government services.)</span></li></ul>'],
        earningRate: ['1%', '2%', '3.5%', '0.35%', '25% of "Other Retail Spends', '10% of "Other Retail Spends'],
        example: ['AED 100 â†’Â 1 Lulu Points', 'AED 100 â†’Â 2 Lulu Points', 'AED 100 â†’Â 3.5 Lulu Points', 'AED 1000 â†’Â 3.50 Lulu Points', 'AED 1000 â†’Â 0.875 Lulu Points', 'AED 1000 â†’Â 0.35 Lulu Points'],
        earningRatePercent: [0.01, 0.02, 0.035, 0.0035, 0.25, 0.10],
        rewardExpiry: luluPoints.expiryDetails,
        rewardCap: "833 Lulu Points per billing cycle"
    }
    const lulu247Platinum = {
        name: "LuLu 247 Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft lucardImage verticalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/lulu_platinum_card.png">',
        spendType: ['Utility Spends', 'Fuel Spends', 'LuLu Spends', 'Other Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets except Lulu</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries & UK </li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Real Estate</li><li>Government Services<br><span id="note">(Utility payment done via DubaiÂ Smart GovernmentÂ will notÂ earnÂ points for utility spendÂ because it\'s classified as government services.)</span></li></ul>'],
        earningRate: ['2%', '4%', '7%', '0.7%', '25% of "Other Retail Spends', '10% of "Other Retail Spends'],
        example: ['AED 100 â†’Â 2 Lulu Points', 'AED 100 â†’Â 4 Lulu Points', 'AED 100 â†’Â 7 Lulu Points', 'AED 1000 â†’Â 7 Lulu Points', 'AED 1000 â†’Â 1.75 Lulu Points', 'AED 1000 â†’Â 0.7 Lulu Points'],
        earningRatePercent: [0.02, 0.04, 0.07, 0.007, 0.25, 0.10],
        rewardExpiry: luluPoints.expiryDetails,
        rewardCap: "1,667 Lulu Points per billing cycle"
    }
    const titaniumCard = {
        name: "Generic Titanium",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Titanium_cc_bottom_card.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['1%', '0.4%', '0.2%'],
        example: ['AED 100Â â†’â€‹â€‹Â 1 Plus Point', 'AED 1000Â â†’Â 4Â Plus Points', 'AED 1000 â†’Â 2Â Plus Points'],
        earningRatePercent: [0.01, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "1,000 Plus Points per billing cycle"
    }
    const dicCard = {
        name: "DIC",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Titanium_cc_bottom_card.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['1%', '0.4%', '0.2%'],
        example: ['AED 100Â â†’â€‹â€‹Â 1 Plus Point', 'AED 1000Â â†’Â 4Â Plus Points', 'AED 1000 â†’Â 2Â Plus Points'],
        earningRatePercent: [0.015, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "1,000 Plus Points per billing cycle"
    }

    const elevateCard = {
        name: "Etihad Elevate Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/etihad_guest_elevate.png">',
        spendType: ['Etihad Airways, â€‹Hotels, Dining & EY.com', 'â€‹International (non-EU) and Domestic spends', 'â€‹Insurance, Car Dealership, Grocery and Supermarkets, Quick Service Restaurants, Retail Spends in European Union (EU) Countries, Real Estate, Education, Petroleum, Transit, Government Services, Utility and Telecommunication Payments', 'â€‹<strong>Additional miles â€‹on all spends</strong>â€‹'],
        earningRate: ['100%', '60%', '60%', '<strong>25%</strong>'],
        example: ['AED 10Â â†’â€‹â€‹Â 10 Etihad Miles', 'AED 10Â â†’Â 6Â Etihad Miles', 'AED 10 â†’Â 6Â Etihad Miles <br>Capped at 1500 miles per billing cycle', '<strong>AED 10 â†’Â Additional 2.5Â Etihad Miles</strong>'],
        earningRatePercent: [1, 0.6, 0.6, 0.25],
        rewardExpiry: etihadMiles.expiryDetails,
        rewardCap: "AED 100K Spend or 60k Miles"
    }

    const inspireCard = {
        name: "Etihad Inspire Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/etihad_guest_inspire.png">',
        spendType: ['Etihad Airways, â€‹Hotels, Dining & EY.com', 'â€‹International (non-EU) and Domestic spends', 'â€‹Insurance, Car Dealership, Grocery and Supermarkets, Quick Service Restaurants, Retail Spends in European Union (EU) Countries, Real Estate, Education, Petroleum, Transit, Government Services, Utility and Telecommunication Payments', 'â€‹<strong>Additional miles â€‹on all spends</strong>â€‹'],
        earningRate: ['70%', '40%', '40%', '<strong>25%</strong>'],
        example: ['AED 10Â â†’â€‹â€‹Â 7 Etihad Miles', 'AED 10Â â†’Â 4Â Etihad Miles', 'AED 10 â†’Â 4Â Etihad Miles <br>Capped at 750 miles per billing cycle', '<strong>AED 10 â†’Â Additional 2.5Â Etihad Miles</strong>'],
        earningRatePercent: [0.7, 0.4, 0.4, 0.25],
        rewardExpiry: etihadMiles.expiryDetails,
        rewardCap: "AED 50K Spend or 20k Miles"
    }

    // ! NEW CARD
    const noonOnePlatinum = {
        name: "noon One Visa Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Noon%20CC.png">',
        spendType: ['noon Food', 'noon Minutes', 'nownow ', 'noon / Namshi / SIVVI', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Real Estate</li><li>Education</li><li>Petroleum</li><li>Transit</li><li>Government Services<br><span id="note">(Utility payment done via DubaiÂ Smart GovernmentÂ will notÂ earnÂ points for utility spendÂ because it\'s classified as government services.)</span></li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['20%', '5% on all Items', '10%', '5%', '0.3%', '1%'],
        example: ['AED 100 â†’Â 20 noon credits', 'AED 100 â†’Â 5 noon credits', 'AED 100 â†’Â 10 noon credits', 'AED 100 â†’Â 5 noon credits', 'AED 100 â†’Â 0.3 noon credits', 'AED 100 â†’Â 1 noon credits'],
        earningRatePercent: [0.2, 0.05, 0.1, 0.05, 0.003],
        rewardExpiry: noonCredits.expiryDetails,
        rewardCap: "2,000 noon credits per month"
    }

    const aldar_Darna_Select = {
        name: "Aldar Darna Select",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/aldar_darna_select_card.png">',
        spendType: ['Aldar locations â€“ retails, groceries, malls, theme parks, hotel. <strong>Aldar properties and education is excluded</strong>', 'Domestic & International (non-Aldar locations)', 'Aldar Education', 'Aldar Property'],
        earningRate: ['6.5%', '0.75%', '10% of base earn rate', '10% of base earn rate'],
        example: ['AED 100 â†’Â 6.5 darna points', 'AED 100 â†’Â 0.75 darna points', 'AED 100 â†’Â 0.65 darna points', 'AED 100 â†’Â 0.65 darna points'],
        earningRatePercent: [0.065, 0.0075, 0.0065, 0.0065],
        rewardExpiry: DarnaPoints.expiryDetails,
        rewardCap: "25,000 Darna points per month"
    }

    const aldar_Darna_Signature = {
        name: "Aldar Darna Signature",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/aldar_darna_signature_card.png">',
        spendType: ['Aldar locations â€“ retails, groceries, malls, theme parks, hotel. <strong>Aldar properties and education is excluded</strong>', 'Domestic & International (non-Aldar locations)', 'Aldar Education', 'Aldar Property'],
        earningRate: ['7.5%', '1%', '10% of base earn rate', '10% of base earn rate'],
        example: ['AED 100 â†’Â 7.5 darna points', 'AED 100 â†’Â 1 darna points', 'AED 100 â†’Â 0.75 darna points', 'AED 100 â†’Â 0.75 darna points'],
        earningRatePercent: [0.075, 0.01, 0.0075, 0.0075],
        rewardExpiry: DarnaPoints.expiryDetails,
        rewardCap: "50,000 Darna points per month"
    }

    const aldar_Darna_Infinite = {
        name: "Aldar Darna Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/darna_infinite_card.png">',
        spendType: ['Aldar locations â€“ retails, groceries, malls, theme parks, hotel. <strong>Aldar properties and education is excluded</strong>', 'Domestic & International (non-Aldar locations)', 'Aldar Education', 'Aldar Property'],
        earningRate: ['10%', '1.5%', '10% of base earn rate', '10% of base earn rate'],
        example: ['AED 100 â†’Â 10 darna points', 'AED 100 â†’Â 1.5 darna points', 'AED 100 â†’Â 1 darna points', 'AED 100 â†’Â 1 darna points'],
        earningRatePercent: [0.10, 0.015, 0.01, 0.01],
        rewardExpiry: DarnaPoints.expiryDetails,
        rewardCap: "100,000 Darna points per month"
    }


    // listen for card selection event
    $("#cardType").change(function () {
        selectedCard = $(this).val();
        loadCardData(selectedCard);

        if (selectedCard == null) {
            $("#SeeCardDetails").hide();
        }
        else {
            $("#SeeCardDetails").show();
        }

    });

    // When user clicks on the calculate button
    $("#submit-button").click(function () {
        if (selectedCard == null || selectedCard == undefined) {
            alert("Please Select a card to proceed");
        }
        else {
            calculateRewards();
        }

    });

    // When user hits Enter key on the keyboard
    $("#txnAmount").keydown(function (e) {
        const nonAlphanumericKeys = [
            "CapsLock", "Shift", "Control", "Alt", "Meta",
            "Escape", " ", "ArrowUp", "ArrowDown",
            "ArrowLeft", "ArrowRight", "Delete", "Home",
            "End", "PageUp", "PageDown", "Insert", "Tab",
            "Backspace", "F1", "F2", "F3", "F4", "F5",
            "F6", "F7", "F8", "F9", "F10", "F11", "F12"
        ];
        if (e.which == 13) {
            if (selectedCard == null || selectedCard == undefined) {
                alert("Please Select a card to proceed");
            }
            else {
                calculateRewards();
                return false;
            }
        }
        else if (nonAlphanumericKeys.includes(event.key)) {
            /*Do Nothin*/
        }
        else if (/[a-z|A-Z]/.test(e.key)) { alert("Please enter transaction amount in numbers") }
    });

    // When user clicks to see card details button
    $("#SeeCardDetails").click(function () {
        myModal.show();
    });


    $('#SwitchCurrency').click(function () {
        // Get the current currency
        var currentCurrency = $('#transactionAmount').text();

        // Toggle the currency
        var newCurrency = (currentCurrency === 'AED') ? 'USD' : 'AED';

        currency = newCurrency;

        // Update the span text
        $('#transactionAmount').text(newCurrency);

        // Update the input placeholder
        $('#txnAmount').attr('placeholder', 'Enter Transaction Amount in ' + newCurrency);
    });

    function nonUSDCards() {
        $('#SwitchCurrency').hide();
        $('#txnAmount').attr('placeholder', 'Enter Transaction Amount');
        $("#transactionAmount").html("AED");
    }

    function addCardComments2Page(comments) {
        console.log(comments)
        if (comments == undefined) {
            $("#comments").html("")
            console.log("comments == undefined");
        } else {
            $("#comments").html(comments)
            console.log("comments !== undefined");
        }
    }

    // identify the selected card and load the details of that card
    function loadCardData(x) {
        selectedCard = x;
        // Assign card object to cardProfile variable depending on card type selected
        if (selectedCard == "Webshopper Card") {
            nonUSDCards();
            addCardComments2Page()
            cardProfile = webshopperCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "U by Emaar Family") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = ubeFamily;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${uPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${uPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "U by Emaar Signature") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = ubeSignature;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${uPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${uPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "U by Emaar Infinite") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = ubeInfinite;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${uPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${uPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Dnata World") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = dnataWorldCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${dPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${dPoints.expiryDetails}</strong></li>
            <li>Reward Capping:
                <ul>
                    <li>Domestic and international Retail Spends: <strong>${cardProfile.rewardCap.domesticInternational}</strong></li>
                    <li>Spends at Dnata & Participating Partner Merchants: <strong>${cardProfile.rewardCap.dnataNmerchants}</strong></li>
                    <li>Duty Free worldwide: <strong>${cardProfile.rewardCap.dutyFree}</strong></li>
                </ul>
            </li>
        </ul`);
        }
        else if (selectedCard == "Dnata Platinum") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = dnataPlatinumCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${dPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${dPoints.expiryDetails}</strong></li>
            <li>Reward Capping:
                <ul>
                    <li>Domestic and international Retail Spends: <strong>${cardProfile.rewardCap.domesticInternational}</strong></li>
                    <li>Spends at Dnata & Participating Partner Merchants: <strong>${cardProfile.rewardCap.dnataNmerchants}</strong></li>
                    <li>Duty Free worldwide: <strong>${cardProfile.rewardCap.dutyFree}</strong></li>
                </ul>
            </li>
        </ul`);
        }
        else if (selectedCard == "Visa Flexi") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = visaFlexi;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Go4it Gold") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = go4itGold;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Go4it Platinum") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = go4itPlatinum;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Manchester United Card") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = manUTD;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${rPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${rPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Diners Club Card") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = dinersClubCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Visa Platinum") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = visaPlatinum;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "MasterCard Platinum") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = mastercardPlatinum;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Visa Infinite") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = visaInfinite;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Priority Banking Visa Infinite") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = prbvisaInfinite;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Duo Credit Card") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = duoCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Skywards Signature") {
            addCardComments2Page();
            $("#transactionAmount").html(currency);
            $('#SwitchCurrency').show();
            cardProfile = skywardsSignature;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${skyMiles.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${skyMiles.expiryDetails}</strong></li>
            <li>Reward Capping:
                <ul>
                    <li>Capping: <strong>${cardProfile.rewardCap.capping}</strong></li>
                    <li>Express Miles Capping: <strong>${cardProfile.rewardCap.expressMilesCap}</strong></li>
                </ul>
            </li>
        </ul`);
        }
        else if (selectedCard == "Skywards Infinite") {
            addCardComments2Page();
            $("#transactionAmount").html(currency);
            $('#SwitchCurrency').show();
            cardProfile = skywardsInfinite;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${skyMiles.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${skyMiles.expiryDetails}</strong></li>
            <li>Reward Capping:
                <ul>
                    <li>Capping: <strong>${cardProfile.rewardCap.capping}</strong></li>
                    <li>Express Miles Capping: <strong>${cardProfile.rewardCap.expressMilesCap}</strong></li>
                </ul>
            </li>
        </ul`);
        }
        else if (selectedCard == "Marriott Bonvoy") {
            addCardComments2Page();
            $("#transactionAmount").html(currency);
            $('#SwitchCurrency').show();
            cardProfile = marriottBonvoy;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${starPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${starPoints.expiryDetails}</strong></li>
            <li>Reward Capping:
                <ul>
                    <li>Capping: <strong>${cardProfile.rewardCap.capping}</strong></li>
                    <li>Express Point Capping: <strong>${cardProfile.rewardCap.expressPointCap}</strong></li>
                </ul>
            </li>
        </ul`);
        }
        else if (selectedCard == "Marriott Bonvoy World Elite Mastercard") {
            addCardComments2Page();
            $("#transactionAmount").html(currency);
            $('#SwitchCurrency').show();
            cardProfile = marriottBonvoy2;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${starPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${starPoints.expiryDetails}</strong></li>
            <li>Reward Capping:
                <ul>
                    <li>Capping: <strong>${cardProfile.rewardCap.capping}</strong></li>
                    <li>Express Point Capping: <strong>${cardProfile.rewardCap.expressPointCap}</strong></li>
                </ul>
            </li>
        </ul`);
        }
        else if (selectedCard == "LuLu 247 Titanium") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = lulu247Titanium;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${luluPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${luluPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "LuLu 247 Platinum") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = lulu247Platinum;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${luluPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${luluPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "noon One Visa Platinum") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = noonOnePlatinum;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${noonCredits.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${noonCredits.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Generic Titanium") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = titaniumCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "DIC") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = dicCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Etihad Elevate Card") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = elevateCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${etihadMiles.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${etihadMiles.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Etihad Inspire Card") {
            nonUSDCards();
            addCardComments2Page();
            cardProfile = inspireCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${etihadMiles.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${etihadMiles.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
        </ul`);
        }
        else if (selectedCard == "Aldar Darna Select") {
            nonUSDCards();
            addCardComments2Page(DarnaPoints.notes);
            cardProfile = aldar_Darna_Select;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${DarnaPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${DarnaPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: ${DarnaPoints.notes}</li>
        </ul`);
        }
        else if (selectedCard == "Aldar Darna Signature") {
            nonUSDCards();
            addCardComments2Page(DarnaPoints.notes);
            cardProfile = aldar_Darna_Signature;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${DarnaPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${DarnaPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: ${DarnaPoints.notes}</li>
        </ul`);
        }
        else if (selectedCard == "Aldar Darna Infinite") {
            nonUSDCards();
            addCardComments2Page(DarnaPoints.notes);
            cardProfile = aldar_Darna_Infinite;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${DarnaPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${DarnaPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: ${DarnaPoints.notes}</li>
        </ul`);
        }
        else {
            selectedCard = null;
            addCardComments2Page();
            $(".selectedCardImage").html("");
            $("#tableBody").html("");
            $("#txnAmount").val("");

        }

        // generate the number of table rows required to accommodate card information
        if (selectedCard != null) {
            // clear existing table data
            $("#tableBody").html("");
            for (var i = 0; i < cardProfile.spendType.length; i++) {
                $("#tableBody").append(`<tr>
                            <td class="align-middle">${cardProfile.spendType[i]}</td>
                            <td class="align-middle text-center">${cardProfile.earningRate[i]}</td>
                            <td class="align-middle text-center">${cardProfile.example[i]}</td>
                            <td class="align-middle text-center" id="pointsEarned${i}"></td>
                          </tr>`);
            }
            $(".selectedCardImage").html(cardProfile.cardImage);
            myModal.show();
        }
    }

    // Actual Calculator function
    function calculateRewards() {
        // get the transaction amount entered by user
        var transactionAmount = $("#txnAmount").val();
        let dynamicTransaction = (currency === 'AED') ? covert2USD(transactionAmount) : transactionAmount;
        var transactionAmountUSD = covert2USD(transactionAmount);
        var openTag = '<p class="pointsResult">';
        var closeTag = '</p>';
        var seperatorSpace = " ";
        var cardName = cardProfile.name;

        // Ensure the amount is entered
        if (transactionAmount == "") {
            alert("Please specify transaction amount");
            return false;
        }

        // ! NEW CARD
        else if (/noon/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
                $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + noonCredits.rewardName + closeTag);
                console.log(cardProfile.earningRatePercent[i])
            }
        }

        // Card specific calculations
        else if (/Emaar/.test(cardName)) {
            var basePoint = (transactionAmount * cardProfile.earningRatePercent[0]);
            var emaarSpends = (transactionAmount * cardProfile.earningRatePercent[1]);
            $(`#pointsEarned0`).html(openTag + basePoint.toFixed(3) + seperatorSpace + uPoints.rewardName + closeTag);
            $(`#pointsEarned1`).html(openTag + emaarSpends.toFixed(3) + seperatorSpace + uPoints.rewardName + closeTag);
            $(`#pointsEarned2`).html(openTag + ((cardProfile.earningRatePercent[2] * emaarSpends) + emaarSpends).toFixed(3) + seperatorSpace + uPoints.rewardName + closeTag);
            $(`#pointsEarned3`).html(openTag + ((cardProfile.earningRatePercent[3] * emaarSpends) + emaarSpends).toFixed(3) + seperatorSpace + uPoints.rewardName + closeTag);
            $(`#pointsEarned4`).html(openTag + (cardProfile.earningRatePercent[4] * basePoint).toFixed(3) + seperatorSpace + uPoints.rewardName + closeTag);
            $(`#pointsEarned5`).html(openTag + (cardProfile.earningRatePercent[5] * basePoint).toFixed(3) + seperatorSpace + uPoints.rewardName + closeTag);
        }
        else if (/Dnata/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length - 2; i++) {
                $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + dPoints.rewardName + closeTag);
            }
            $(`#pointsEarned5`).html(openTag + (cardProfile.earningRatePercent[5] * (transactionAmount * cardProfile.earningRatePercent[0])).toFixed(2) + seperatorSpace + dPoints.rewardName + closeTag);
            $(`#pointsEarned6`).html(openTag + (cardProfile.earningRatePercent[6] * (transactionAmount * cardProfile.earningRatePercent[0])).toFixed(2) + seperatorSpace + dPoints.rewardName + closeTag);
        }
        else if (/Skywards/.test(cardName)) {
            var basePoint = (dynamicTransaction * cardProfile.earningRatePercent[0]);
            var internationalSpend = (dynamicTransaction * cardProfile.earningRatePercent[1]);
            var emiratesSpend = (dynamicTransaction * cardProfile.earningRatePercent[2]);
            $(`#pointsEarned0`).html(openTag + basePoint.toFixed(2) + seperatorSpace + skyMiles.rewardName + closeTag);
            $(`#pointsEarned1`).html(openTag + internationalSpend.toFixed(1) + seperatorSpace + skyMiles.rewardName + closeTag);
            $(`#pointsEarned2`).html(openTag + emiratesSpend.toFixed(1) + seperatorSpace + skyMiles.rewardName + closeTag);
            $(`#pointsEarned3`).html(openTag + (cardProfile.earningRatePercent[3] * internationalSpend).toFixed(2) + seperatorSpace + skyMiles.rewardName + closeTag);
            $(`#pointsEarned4`).html(openTag + (cardProfile.earningRatePercent[4] * basePoint).toFixed(4) + seperatorSpace + skyMiles.rewardName + closeTag);
            $(`#pointsEarned5`).html(openTag + (cardProfile.earningRatePercent[5] * basePoint).toFixed(3) + seperatorSpace + skyMiles.rewardName + closeTag);
        }
        else if (/Priority Banking Visa Infinite/.test(cardName)) {
            if (transactionAmount < 2500) {
                console.log(transactionAmount + " is less than 2500")
                $(`#pointsEarned${0}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[0]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
                $(`#pointsEarned${1}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${2}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${3}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[3]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
            }
            else if (transactionAmount > 2499 && transactionAmount < 5000) {
                console.log(transactionAmount + " is between 2500 and 4999")
                $(`#pointsEarned${0}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${1}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[1]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
                $(`#pointsEarned${2}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${3}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[3]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
            }
            else {
                console.log(transactionAmount + " does not meet any of the above criteria, this means it is 5000 and above")
                $(`#pointsEarned${0}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${1}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${2}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[2]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
                $(`#pointsEarned${3}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[3]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
            }
            // for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
            //     $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
            // }
        }

        else if (/Go4it|Webshopper|Flexi|Diners|DIC|Generic Titanium|Duo|Visa Infinite|Visa Platinum|MasterCard Platinum/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
                $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
            }
        }
        else if (/LuLu/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length - 2; i++) {
                $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + luluPoints.rewardName + closeTag);
            }
            $(`#pointsEarned4`).html(openTag + (cardProfile.earningRatePercent[4] * (transactionAmount * cardProfile.earningRatePercent[3])).toFixed(2) + seperatorSpace + luluPoints.rewardName + closeTag);
            $(`#pointsEarned5`).html(openTag + (cardProfile.earningRatePercent[5] * (transactionAmount * cardProfile.earningRatePercent[3])).toFixed(2) + seperatorSpace + luluPoints.rewardName + closeTag);
        }

        else if (/Manchester/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
                if (i == 4) { $(`#pointsEarned4`).html(openTag + (cardProfile.earningRatePercent[4] * (transactionAmount * cardProfile.earningRatePercent[1])).toFixed(2) + seperatorSpace + rPoints.rewardName + closeTag) }
                else { $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + rPoints.rewardName + closeTag) }
            }
        }
        else if (/Marriott/.test(cardName)) {
            var basePoint = (dynamicTransaction * cardProfile.earningRatePercent[0]);
            var internationalSpend = (dynamicTransaction * cardProfile.earningRatePercent[1]).toFixed(3);
            var retailInEU = (basePoint * cardProfile.earningRatePercent[2]).toFixed(3);
            var marriotSpends = (dynamicTransaction * cardProfile.earningRatePercent[3]).toFixed(3);
            $(`#pointsEarned0`).html(openTag + basePoint.toFixed(3) + seperatorSpace + starPoints.rewardName + closeTag);
            $(`#pointsEarned1`).html(openTag + internationalSpend + seperatorSpace + starPoints.rewardName + closeTag);
            $(`#pointsEarned2`).html(openTag + retailInEU + seperatorSpace + starPoints.rewardName + closeTag);
            $(`#pointsEarned3`).html(openTag + marriotSpends + seperatorSpace + starPoints.rewardName + closeTag);
            $(`#pointsEarned4`).html(openTag + (cardProfile.earningRatePercent[4] * basePoint).toFixed(3) + seperatorSpace + starPoints.rewardName + closeTag);
            $(`#pointsEarned5`).html(openTag + (cardProfile.earningRatePercent[5] * basePoint).toFixed(3) + seperatorSpace + starPoints.rewardName + closeTag);
        }
        else if (/Etihad Elevate/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
                let calculatedPoints = (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2);

                if (i === 2 && calculatedPoints >= 1500) {
                    calculatedPoints = 1500;
                }

                $(`#pointsEarned${i}`).html(`${openTag} 
                ${calculatedPoints}
                ${seperatorSpace}
                ${etihadMiles.rewardName}
                ${closeTag}`);
            }
        }
        else if (/Etihad Inspire/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
                let calculatedPoints = (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2);

                if (i === 2 && calculatedPoints >= 750) {
                    calculatedPoints = 750;
                }

                $(`#pointsEarned${i}`).html(`${openTag} 
                ${calculatedPoints}
                ${seperatorSpace}
                ${etihadMiles.rewardName}
                ${closeTag}`);
            }
        }

        else if (/Darna/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
                $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + DarnaPoints.rewardName + closeTag);
            }
        }
    }

    // convert from AED to USD
    function covert2USD(AED) {
        var dollarRate;
        if (cardProfile.name == "Marriott Bonvoy") { dollarRate = 3.672 }
        else { dollarRate = 3.678 }
        return AED / dollarRate; // Dollar rate against Dirhams
    }

    // Fancy stuff for emoji
    // $(".helpOption").on("mouseenter", function () {
    //     $("#hlpEmj1").html("ðŸ˜");
    //     $("#hlpEmj2").html("â”");
    // });
    // $(".helpOption").on("mouseleave", function () {
    //     $("#hlpEmj1").html("ðŸ§");
    //     $("#hlpEmj2").html("â“");
    // });
    // $(".navbar-brand").on("mouseenter", function () {
    //     $("#goHome").html("ðŸš€");
    // });
    // $(".navbar-brand").on("mouseleave", function () {
    //     $("#goHome").html("ðŸ›");
    // });

    // Display calculator instructions
    $(".helpOption").click(function () {
        howToUseCalculator.show();
    })



    /* *********************************************** *\
    The below section includes SharePoint RESTful API
    ðŸ˜Ž To Submit Feedback and Suggestions
    ðŸ˜Ž To Track number of users
    Author: Oluwatobiloba Raymond Ariwoola ðŸ˜Ž
    \* *********************************************** */

    var rating;
    var category;
    var userComment;
    var visitorID = _spPageContextInfo.userId;
    updateAppUserList();


    $(".submitFeedback").click(function () {
        userComment = $("#comment").val();
        category = $('input[name=category]:checked').val();
        rating = $('input[name=rating]:checked').val();

        if (!/[a-z]|[A-Z]|[0-9]/.test(userComment)) {
            alert("Please provide comment");
            $("#comment").addClass("failure");
            setTimeout(() => {
                $("#comment").removeClass("failure");
            }, 1100);
            return false;
        }
        else if ($('input[name=rating]:checked').length == 0) {
            alert("Please provide Rating");
            $(' .rating>label').addClass("failure");
            setTimeout(() => {
                $(' .rating>label').removeClass("failure");
            }, 1100);
            return false;
        }
        else {
            postUserFeedback(); // update the list
            $("#progress").addClass("moveProgress");
            setTimeout(() => {
                $(".feedbackModal").html(`<h1> Thank you for your ${category}.`)
            }, 5100);
            $(".submitFeedback").hide();
        }

    })

    $(".form-check-input").change(function () {
        if ($('input[name=category]:checked').length > 0) {
            category = $(this).val();
        }
    })

    $(".starRating").change(function () {
        if ($('input[name=rating]:checked').length > 0) {
            rating = $(this).val();
        }
    })

    function updateAppUserList() {

        var _phitCount = checkIfUser();

        if (_phitCount) {
            var _HitItemID = _phitCount.ID;
            var _HitCount = _phitCount.count;
            var itemType = "SP.Data.RewardsCalculatorUsersListItem";
            var item = {
                "__metadata": {
                    "type": itemType
                },
                "numberOfVisits": (_HitCount + 1),
                "userSPID": visitorID
            };

            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('rewardsCalculatorUsers')/items(" + _HitItemID + ")",
                type: "POST",
                data: JSON.stringify(item),
                contentType: "application/json;odata=verbose",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "X-HTTP-Method": "MERGE",
                    "If-Match": "*"
                },
                success: function (data) {
                    console.log("Success");
                    console.log(data);
                },
                error: function (data) {
                    console.log("Failed");
                    console.log(data);
                }
            });
        }
        else {
            //Add New Record with Hit Count 1
            var itemType = "SP.Data.RewardsCalculatorUsersListItem";
            var item = {
                "__metadata": {
                    "type": itemType
                },
                // "Title": visitorID,
                "numberOfVisits": 1,
                "userSPID": visitorID
            };

            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('rewardsCalculatorUsers')/items",
                type: "POST",
                async: false,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(item),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }
    }

    function checkIfUser() {
        var _pageHit = '';
        $.ajax({
            // $expand=Author&$select=Id,Author/Title,Author/Department,Author/FirstName,Author/LastName
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('rewardsCalculatorUsers')/items?$expand=Author&$select=Id,numberOfVisits,Author/Title,Author/Department,Author/FirstName,Author/LastName&$filter=(userSPID eq ('" + visitorID + "'))",
            method: "GET",
            async: false,
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                if (data.d.results.length > 0) {
                    $.each(data.d.results, function (index, item) {
                        _pageHit = {
                            ID: item.ID,
                            count: item.numberOfVisits
                        };

                    });

                    console.log(data.d.results);

                    if (data.d.results.length > 0) {
                        console.log("Existing User");
                    } else {
                        setTimeout(() => {
                            howToUseCalculator.show();
                        }, 2000); // Display information after 2000 milli Seconds => 2 Seconds
                        console.log("New User");
                    }
                }
                else {
                    _readerPageHit = null;
                }

            },
            error: function (error) {
            }
        });
        return _pageHit;
    }


    function postUserFeedback(appUserID) {
        var _phitCount = checkIfUserRated(appUserID);

        if (_phitCount) {
            // Update feedback
            var _HitItemID = _phitCount.ID;
            var _HitCount = _phitCount.rating;
            var itemType = "SP.Data.FeedbackTrackerListItem";
            var item = {
                "__metadata": {
                    "type": itemType
                },
                "starRating": rating,
                "category": category,
                "userComment": userComment,
            };

            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('CC-calculator-feedbackTracker')/items(" + _HitItemID + ")",
                type: "POST",
                data: JSON.stringify(item),
                contentType: "application/json;odata=verbose",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "X-HTTP-Method": "MERGE",
                    "If-Match": "*"
                },
                success: function (data) {
                    console.log("Success");
                    console.log(data);
                },
                error: function (data) {
                    console.log("Failed");
                    console.log(data);
                }
            });
        }
        else {
            //Add New feedback
            var itemType = "SP.Data.FeedbackTrackerListItem";
            var item = {
                "__metadata": {
                    "type": itemType
                },
                "Title": "Rewards Calculator",
                "starRating": rating,
                "category": category,
                "userComment": userComment,
                "userSPID": visitorID,
            };

            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('CC-calculator-feedbackTracker')/items",
                type: "POST",
                async: false,
                contentType: "application/json;odata=verbose",
                data: JSON.stringify(item),
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }
    }

    function checkIfUserRated(appUserID) {
        var _pageHit = '';
        $.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('CC-calculator-feedbackTracker')/items?$select=ID,starRating,category,userComment&$filter=(userSPID eq ('" + appUserID + "'))",
            method: "GET",
            async: false,
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                if (data.d.results.length > 0) {
                    $.each(data.d.results, function (index, item) {
                        _pageHit = {
                            ID: item.ID,
                            rating: item.starRating
                        };

                    });
                    if (data.d.results.length > 0) {
                        $(".sendFeedbackBtn").attr('disabled', 'disabled');
                        $(".sendFeedbackBtn").html(`${category} Submitted`);
                        $(".howToUseCalcContent h6").html("");

                    } else {
                        $(".sendFeedbackBtn").html("Send Feedback/Suggestion");
                    }
                }
                else {
                    _readerPageHit = null;
                }
            },
            error: function (error) {
            }
        });
        return _pageHit;
    }
});