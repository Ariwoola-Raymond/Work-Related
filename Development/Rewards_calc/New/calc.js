$(document).ready(function () {
    /* *********************************************** *\
    The below section includes the calculator APP
    Author: Oluwatobiloba Raymond Ariwoola 😎
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
        expiryDetails: "​Subject to the T&C’s of U By Emaar"
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
        expiryDetails: "Subject to the T&C’s of Marriott​"
    };
    const luluPoints = {
        rewardName: "Lulu Points",
        expiryDetails: "All lulu Points earned are evergreen and do not expire.​"
    };
    const noonCredits = {
        rewardName: "noon credits",
        expiryDetails: "Noon credits have an expiry period of 5 years from the date of credit​"
    };
    const etihadMiles = {
        rewardName: "Etihad Miles",
        expiryDetails: 'Refer customer to Etihad Guest Terms & Conditions. <a href="https://www.etihadguest.com/en/terms-and-conditions.html​" target="_blank">https://www.etihadguest.com/en/terms-and-conditions.html​</a>', //! Add html elements
        notes: "<i style='color: red;'><ul><li>Express Miles Programme members will be eligible to receive 50% more Miles earned on regular miles in every statement cycle, capped at 4000 Miles, and is subject to a AED262.5* monthly fee inclusive of VAT.</li><li>This monthly fee will replace the annual membership fee on the credit card.</li><li>This Programme is available only in the first/joining year of the card account set up.</li></ul></i>"
    };
    const DarnaPoints = {
        rewardName: "Darna Points",
        expiryDetails: "Darna Points have an expiry period of 2 years from the date of credit",
        notes: "<i style='color: red;'>Customer can get up to 3.6% additional Darna points on their spends within the Aldar ecosystem, which will appear on their Darna app. However, Emirates NBD will not be able to control the credit/debit of these points. In case of dispute, customer to contact Darna Loyalty customer care.</i>"
    };
    const sharePoints = {
        rewardName: "SHARE Points",
        expiryDetails: 'The validity of Share points is for 2 years from date received',
        notes: "<i style='color: red;'>Points earned through qualifying spends will be credited to the customer’s SHARE Member Account within a period of maximum 7 days, after the settlement process is complete. <br><hr> For any information on the Additional rewards by SHARE, customers will need to visit <a href='https://www.sharerewards.com/' target='_blank' rel='noopener noreferrer'>https://www.sharerewards.com/</a> or call SHARE customer care. </i>" 
    };


    // create card objects
    const webshopperCard = {
        name: "Webshopper",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Webshopper_Front.png">',
        spendType: ['All Online Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['0.5%', '0.4%', '0.2%'],
        example: ['AED 200 →​​ 1 Plus Point', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.005, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "500 Plus Points per billing cycle"
    };
    const ubeFamily = {
        name: "U by Emaar Family",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/emaar-visa-family-bottom.png">',
        spendType: ['Domestic and International Retail (base Spends)', 'Spends at Emaar', 'Emaar Hospitality (Bonus)', 'Emaar Entertainment (Bonus)', ' Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Petroleum</li><li>Government Services</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['10%', '50%', '10% of Emaar Spends', '5% of Emaar Spends', '25% of Base Spends', '10% of Base Spends'],
        example: ['AED 100 → 10 uPoints', 'AED 100 → 50 uPoints', 'AED 100 → 50 uPoint Spend at Emaar (50%) + 5 uPoints Additional (10% of 50%)', 'AED 100 → 50 uPoint Spend at Emaar (50%) + 2.5 uPoints Additional (5% of 50%)', 'AED 100 → 2.5 uPoints', 'AED 100 → 1 uPoint'],
        earningRatePercent: [0.1, 0.5, 0.1, 0.05, 0.25, 0.10],
        rewardExpiry: uPoints.expiryDetails,
        rewardCap: "8,333 uPoints per billing cycle"
    }
    const ubeSignature = {
        name: "U by Emaar Signature",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/emaar-visa-signature-bottom.png">',
        spendType: ['Domestic and International Retail (base Spends)', 'Spends at Emaar', 'Emaar Hospitality (Bonus)', 'Emaar Entertainment (Bonus)', ' Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Petroleum</li><li>Government Services</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['12.5%', '62.5%', '10% of Emaar Spends', '5% of Emaar Spends', '25% of Base Spends', '10% of Base Spends'],
        example: ['AED 100 → 12.5 uPoints', 'AED 100 → 62.5 uPoints', 'AED 100 → 62.5 uPoint Spend at Emaar (62.5%) + 6.25 uPoints Additional (10% of 62.5%)', 'AED 100 → 62.5 uPoint Spend at Emaar (62.5%) + 3.125 uPoints Additional (5% of 62.5%)', 'AED 100 → 3.125 uPoints', 'AED 100 → 1.25 uPoint'],
        earningRatePercent: [0.125, 0.625, 0.1, 0.05, 0.25, 0.10],
        rewardExpiry: uPoints.expiryDetails,
        rewardCap: "16,666 uPoints per billing cycle"
    }
    const ubeInfinite = {
        name: "U by Emaar Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/emaar-visa-infinite-bottom.png">',
        spendType: ['Domestic and International Retail (base Spends)', 'Spends at Emaar', 'Emaar Hospitality (Bonus)', 'Emaar Entertainment (Bonus)', ' Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Petroleum</li><li>Government Services</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['15%', '75%', '10% of Emaar Spends', '5% of Emaar Spends', '25% of Base Spends', '10% of Base Spends'],
        example: ['AED 100 → 15 uPoints', 'AED 100 → 75 uPoints', 'AED 100 → 75 uPoint Spend at Emaar (75%) + 7.5 uPoints Additional (10% of 75%)', 'AED 100 → 75 uPoint Spend at Emaar (75%) + 3.75 uPoints Additional (5% of 75%)', 'AED 100 → 3.75 uPoints', 'AED 100 → 1.5 uPoint'],
        earningRatePercent: [0.15, 0.75, 0.1, 0.05, 0.25, 0.10],
        rewardExpiry: uPoints.expiryDetails,
        rewardCap: "83,333 uPoints per billing cycle"
    }
    const dnataWorldCard = {
        name: "Dnata World",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/dnataWorldCC_bottom_card.png">',
        spendType: ['Domestic & International Spends (base)', 'Spends at Dnata Travel\Dnatatravel.com', 'Spends at Partnered Merchants: Apres, City Sightseeing Dubai, Costa, Giraffe, Imagine Cruising, Left Bank.', 'Spends at Partnered Merchants: Al Hamra Cellar, Arabian Adventures, Emirates Holidays, Le Clos, MMI.', 'Duty Free World Wide', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries & UK</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['1.5%', '15%', '15%', '10%', '10%', '25% of Base earning', '10% of Base earning'],
        example: ['AED 100 → 1.5 Dnata Points', 'AED 100 → 15 Dnata Points', 'AED 100 → 15 Dnata Points', 'AED 100 → 10 Dnata Points', 'AED 100 → 10 Dnata Points', 'AED 100 → 0.5 Dnata Points', 'AED 100 → 0.2 Dnata Points'],
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
        spendType: ['Domestic & International Spends (base)', 'Spends at Dnata Travel\Dnatatravel.com', 'Spends at Partnered Merchants: Apres, City Sightseeing Dubai, Costa, Giraffe, Imagine Cruising, Left Bank.', 'Spends at Partnered Merchants: Al Hamra Cellar, Arabian Adventures, Emirates Holidays, Le Clos, MMI.', 'Duty Free World Wide', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries & UK</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li> </ul>'],
        earningRate: ['1%', '10%', '15%', '10%', '5%', '25% of Base earning', '10% of Base earning'],
        example: ['AED 100 → 1 Dnata Points', 'AED 100 → 10 Dnata Points', 'AED 100 → 15 Dnata Points', 'AED 100 → 10 Dnata Points', 'AED 100 → 5 Dnata Points', 'AED 100 → 0.375 Dnata Points', 'AED 100 → 0.15 Dnata Points'],
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
        example: ['AED 100 →​​ 1.5 Plus Point', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.015, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const go4itGold = {
        name: "Go4it Gold",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/go4itGold_cc_bottom_card.png">',
        spendType: ['Retail Spends on Weekdays', 'Retail Spends on Weekends<br>(Saturday & Sunday)', 'RTA(Dubai Metro, Dubai Taxi, Tram and ferries)', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['0.25%', '1.25%', '1%', '0.4%', '0.2%'],
        example: ['AED 400 → 1 Plus Points', 'AED 400 → 5 Plus Points', 'AED 400 → 4 Plus Points', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.0025, 0.0125, 0.01, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const go4itPlatinum = {
        name: "Go4it Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/go4itPlatinum_cc_bottom_card.png">',
        spendType: ['Retail Spends on Weekdays', 'Retail Spends on Weekends<br>(Saturday & Sunday)', 'RTA(Dubai Metro, Dubai Taxi, Tram and ferries)', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['0.5%', '2.5%', '1%', '0.4%', '0.2%'],
        example: ['AED 200 → 1 Plus Points', 'AED 200 → 5 Plus Points', 'AED 200 → 4 Plus Points', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.005, 0.025, 0.02, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "3,000 Plus Points per billing cycle"
    }
    const manUTD = {
        name: "Manchester United Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/manUtdCard_showcase.png">',
        spendType: ['All Retail Spends', 'International Spends', 'Dining Outlets', 'Sports Goods Stores', 'Retail Spends in European Union (EU) Countries', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['100%', '200%', '500%', '1000%', '25% of International Spends', '25% of Retail Spends', '10% of Retail Spends'],
        example: ['1 AED → 1 Red Point', '1 AED → 2 Red Point', '1 AED → 5 Red Point', '1 AED → 10 Red Point', '1 AED → 0.50 Red Point', '1 AED → 0.25 Red Point', '1 AED → 0.10 Red Point'],
        earningRatePercent: [1, 2, 5, 10, 0.25, 0.25, 0.10],
        rewardExpiry: rPoints.expiryDetails,
        rewardCap: "50,000 Red Points per billing cycle"
    }
    const dinersClubCard = {
        name: "Diners Club Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/dinersClubCard_showcase.png">',
        spendType: ['Duty Free Spends', 'Dining Spends', 'Domestic and International Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['5%', '2.5%', '0.5%', '0.4%', '0.2%'],
        example: ['AED 100 → 5 Plus Points', 'AED 100 → 2.5 Plus Points', 'AED 100 → 0.5 Plus Points', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.05, 0.025, 0.005, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const visaPlatinum = {
        name: "Visa Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/PlatinumCC_bottom_visaCard.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['1.5%', '0.4%', '0.2%'],
        example: ['AED 100 →​​ 1.5 Plus Point', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.015, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const mastercardPlatinum = {
        name: "MasterCard Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/PlatinumCC_bottom_masterCard.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['1.5%', '0.4%', '0.2%'],
        example: ['AED 100 →​​ 1.5 Plus Point', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.015, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "2,000 Plus Points per billing cycle"
    }
    const visaInfinite = {
        name: "Visa Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/infinite_cc_bottom_card.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['2%', '0.4%', '0.2%'],
        example: ['AED 100 →​​ 2 Plus Point', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.02, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "3,000 Plus Points per billing cycle"
    }

    const prbvisaInfinite = {
        name: "Priority Banking Visa Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/prb_visa_infinite.png">',
        spendType: ['Retail Transactions below AED 2,500', 'Retail Transactions from AED 2,500 to AED 4,999', 'Retail Transactions of AED 5,000 and above', 'Categorized Earning<ul><li>Spends originating in European Union (EU) countries</li><li>Quick service restaurant (fast-food restaurant)</li><li>Transit</li><li>Government services</li><li>Telecommunication transactions</li><li>Supermarkets and groceries</li><li>Insurance</li><li>Car dealerships</li><li>Fuel</li><li>Utility payments</li><li>Real estate</li><li>Education expenses</li><li>Charity</li></ul>'],
        earningRate: ['1%', '2%', '5%', '1%'],
        example: ['AED 100 →​​ 1 Plus Point', 'AED 100 → 2 Plus Points', 'AED 100 → 5 Plus Points', 'AED 100 →​​ 1 Plus Point'],
        earningRatePercent: [0.01, 0.02, 0.05, 0.01],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "Plus Points Rewards earned per statement cycle will be capped at 5,000 and maximum of 60,000 Plus Points Rewards can be earned per annum"
    }
    const duoCard = {
        name: "Duo Credit Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/duo_showcase.png">',
        spendType: ['Domestic and International Retail Spends', '<ul><li>Grocery and Supermarkets</li><li>Utility Payments</li><li>Electronics</li><li>Education</li><li>Fuel</li></ul>', '<ul><li>Grocery and Supermarkets</li><li>Utility Payments</li><li>Electronics</li><li>Education</li><li>Fuel</li></ul>'],
        earningRate: ['0.5%', '5% - <strong>Minimum spend of AED 5,000 met</strong>', '1.5% - <strong>Minimum spend of AED 5,000 not met</strong>'],
        example: ['AED 100 → 0.5 Plus Point', 'AED 100 → 5 Plus Point', 'AED 100 → 1.5 Plus Point'],
        earningRatePercent: [0.005, 0.05, 0.015],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "Maximum points will be capped at 500 Plus Points per statement for each card."
    }
    const skywardsSignature = {
        name: "Skywards Signature",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/skywardsSignatureCC_bottom_card.png">',
        spendType: ['Domestic Retail Spends (Base Miles)', 'International Retail Spends (Non - EU)', 'Emirates.ae, FlyDubai.com spends, Duty free, Online Food Delivery, Car Booking app', 'International Spends (EU) & UK', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['75%', '100%', '150%', '50% of international (Non-EU) Earning Rate', '25% of Base Miles', '10% of Base Miles'],
        example: ['USD 1 → 0.75 Skywards Miles', 'USD 1 → 1 Skywards Miles', 'USD 1 → 1.5 Skywards Miles', 'USD 1 → 0.50 Skywards Miles', 'USD 1 → 0.1875 Skywards Miles', 'USD 1 → 0.075 Skywards Miles'],
        earningRatePercent: [0.75, 1, 1.5, 0.5, 0.25, 0.10],
        rewardExpiry: skyMiles.expiryDetails,
        rewardCap: {
            capping: "​Up to credit card limit or AED 50,000 which ever is lower per billing cycle",
            expressMilesCap: "Card does not have Express Miles facility"
        }
    }
    const skywardsInfinite = {
        name: "Skywards Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/skywardsInfiniteCC_bottom_card.png">',
        spendType: ['Domestic Retail Spends (Base Miles)', 'International Retail Spends (Non - EU)', 'Emirates.ae, FlyDubai.com spends, Duty free, Online Food Delivery, Car Booking app', 'International Spends (EU) & UK', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['100%', '150%', '200%', '50% of international (Non-EU) Earning Rate', '25% of Base Miles', '10% of Base Miles'],
        example: ['USD 1 → 1 Skywards Miles', 'USD 1 → 1.5 Skywards Miles', 'USD 1 → 2 Skywards Miles', 'USD 1 → 0.75 Skywards Miles', 'USD 1 → 0.25 Skywards Miles', 'USD 1 → 0.10 Skywards Miles'],
        earningRatePercent: [1, 1.5, 2, 0.5, 0.25, 0.10],
        rewardExpiry: skyMiles.expiryDetails,
        rewardCap: {
            capping: "​Up to credit card limit or AED 100,000 which ever is lower per statement",
            expressMilesCap: "Maximum of 4000 miles that can be earned in a statement​"
        }
    }
    const marriottBonvoy = {
        name: "Marriott Bonvoy",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/marriott_world_world_cc_img.png">',
        spendType: ['Domestic Retail Spends (Base Earning Rate)', '​International Spends', 'Retail Spends in European Union (EU) Countries', 'Spends at Marriot Properties', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['150%', '150%', '50% of Base rate', 'Up to 3 points per 1 USD <br> 3 Points earned at the time of billing will reflect on the credit card statement', '25% of Base rate', '10% of Base rate'],
        example: ['USD 1 → 1.5 Points', 'USD 1 → 1.5 Points', 'USD 1 → 0.75 Points', 'USD 1 → Up To 3 Points', 'USD 1 → 0.375 Points', 'USD 1 → 0.15 Points'],
        earningRatePercent: [1.5, 1.5, 0.50, 3, 0.25, 0.10],
        rewardExpiry: starPoints.expiryDetails,
        rewardCap: {
            capping: "​Up to credit card limit",
            expressPointCap: "12,000 points per statement​"
        }
    }

    const marriottBonvoy2 = {
        name: "Marriott Bonvoy World Elite Mastercard",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/marriott_world_elite_cc_img.png">',
        spendType: ['Domestic Retail Spends (Base Earning Rate)', '​International Spends', 'Retail Spends in European Union (EU) Countries', 'Spends at Marriot Properties', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['300%', '300%', '50% of Base rate', 'Up to 6 points per 1 USD <br> 6 Points earned at the time of billing will reflect on the credit card statement', '25% of Base rate', '10% of Base rate'],
        example: ['USD 1 → 3 Points', 'USD 1 → 3 Points', 'USD 1 → 1.5 Points', 'USD 1 → Up To 6 Points', 'USD 1 → 0.75 Points', 'USD 1 → 0.3 Points'],
        earningRatePercent: [3, 3, 0.50, 6, 0.25, 0.10],
        rewardExpiry: starPoints.expiryDetails,
        rewardCap: {
            capping: "​Up to credit card limit",
            expressPointCap: "12,000 points per statement​"
        }
    }

    const lulu247Titanium = {
        name: "LuLu 247 Titanium",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft lucardImage verticalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/lulu_titanium_card.png">',
        spendType: ['Utility Spends', 'Fuel Spends', 'LuLu Spends', 'Other Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets except Lulu</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries & UK </li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Real Estate</li><li>Government Services<br><span id="note">(Utility payment done via Dubai Smart Government will not earn points for utility spend because it\'s classified as government services.)</span></li></ul>'],
        earningRate: ['1%', '2%', '3.5%', '0.35%', '25% of "Other Retail Spends', '10% of "Other Retail Spends'],
        example: ['AED 100 → 1 Lulu Points', 'AED 100 → 2 Lulu Points', 'AED 100 → 3.5 Lulu Points', 'AED 1000 → 3.50 Lulu Points', 'AED 1000 → 0.875 Lulu Points', 'AED 1000 → 0.35 Lulu Points'],
        earningRatePercent: [0.01, 0.02, 0.035, 0.0035, 0.25, 0.10],
        rewardExpiry: luluPoints.expiryDetails,
        rewardCap: "833 Lulu Points per billing cycle"
    }
    const lulu247Platinum = {
        name: "LuLu 247 Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft lucardImage verticalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/lulu_platinum_card.png">',
        spendType: ['Utility Spends', 'Fuel Spends', 'LuLu Spends', 'Other Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets except Lulu</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries & UK </li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Real Estate</li><li>Government Services<br><span id="note">(Utility payment done via Dubai Smart Government will not earn points for utility spend because it\'s classified as government services.)</span></li></ul>'],
        earningRate: ['2%', '4%', '7%', '0.7%', '25% of "Other Retail Spends', '10% of "Other Retail Spends'],
        example: ['AED 100 → 2 Lulu Points', 'AED 100 → 4 Lulu Points', 'AED 100 → 7 Lulu Points', 'AED 1000 → 7 Lulu Points', 'AED 1000 → 1.75 Lulu Points', 'AED 1000 → 0.7 Lulu Points'],
        earningRatePercent: [0.02, 0.04, 0.07, 0.007, 0.25, 0.10],
        rewardExpiry: luluPoints.expiryDetails,
        rewardCap: "1,667 Lulu Points per billing cycle"
    }
    const titaniumCard = {
        name: "Generic Titanium",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Titanium_cc_bottom_card.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li><li>Charity</li></ul>'],
        earningRate: ['1%', '0.4%', '0.2%'],
        example: ['AED 100 →​​ 1 Plus Point', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.01, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "1,000 Plus Points per billing cycle"
    }
    const dicCard = {
        name: "DIC",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Titanium_cc_bottom_card.png">',
        spendType: ['Retail Spends', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Retail Spends in European Union (EU) Countries</li></ul>', 'Categorized Earning 2<ul><li>Education</li><li>Government Services</li><li>Petroleum</li><li>Real Estate</li><li>Transit</li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['1%', '0.4%', '0.2%'],
        example: ['AED 100 →​​ 1 Plus Point', 'AED 1000 → 4 Plus Points', 'AED 1000 → 2 Plus Points'],
        earningRatePercent: [0.015, 0.004, 0.002],
        rewardExpiry: pPoints.expiryDetails,
        rewardCap: "1,000 Plus Points per billing cycle"
    }

    const elevateCard = {
        name: "Etihad Elevate Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/etihad_guest_elevate.png">',
        spendType: ['Etihad Airways, ​Hotels, Dining & EY.com', '​International (non-EU) and Domestic spends','​Retail spends in EU countries and United Kingdom', 'Categorized Earning 1 <ul><li>Grocery and Supermarkets</li><li>Quick Service Restaurants (i.e., fast-food restaurants)</li><li>Insurance</li><li>Car dealerships</li></ul>', 'Categorized Earning 2 <ul><li>Petroleum</li><li>Transit</li><li>Government Services</li><li>Utility Payments</li><li>Real Estate</li><li>Education</li><li>Telecommunication Payments</li></ul>', '​<strong>Additional miles ​on all spends</strong>​'],
        earningRate: ['100%', '60%', '30%', '15%', '6%', '25%'],
        example: ['AED 10 →​​ 10 Etihad Miles', 'AED 10 → 6 Etihad Miles', 'AED 10 → 3 Etihad Miles', 'AED 10 → 1.5 Etihad Miles', 'AED 10 → 0.6 Etihad Miles','AED 10 → Additional 2.5 Etihad Miles'],
        earningRatePercent: [1, 0.6, 0.3, 0.15, 0.06, 0.25],
        rewardExpiry: etihadMiles.expiryDetails,
        rewardCap: "AED 100K Spend or 60k Miles"
    }

    const inspireCard = {
        name: "Etihad Inspire Card",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft horizontalCard" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/etihad_guest_inspire.png">',
        spendType: ['Etihad Airways, ​Hotels, Dining & EY.com', '​International (non-EU) and Domestic spends','​Retail spends in EU countries and United Kingdom', 'Categorized Earning 1 <ul><li>Grocery and Supermarkets</li><li>Quick Service Restaurants (i.e., fast-food restaurants)</li><li>Insurance</li><li>Car dealerships</li></ul>', 'Categorized Earning 2 <ul><li>Petroleum</li><li>Transit</li><li>Government Services</li><li>Utility Payments</li><li>Real Estate</li><li>Education</li><li>Telecommunication Payments</li></ul>', '​<strong>Additional miles ​on all spends</strong>​'],
        earningRate: ['100%', '60%', '20%', '10%', '4%', '25%'],
        example: ['AED 10 →​​ 10 Etihad Miles', 'AED 10 → 6 Etihad Miles', 'AED 10 → 2 Etihad Miles', 'AED 10 → 1 Etihad Mile', 'AED 10 → 0.4 Etihad Miles','AED 10 → Additional 2.5 Etihad Miles'],
        earningRatePercent: [1, 0.6, 0.2, 0.10, 0.04, 0.25],
        rewardExpiry: etihadMiles.expiryDetails,
        rewardCap: "AED 50K Spend or 20k Miles"
    }

    const noonOnePlatinum = {
        name: "noon One Visa Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Noon%20CC.png">',
        spendType: ['noon Food', 'noon Minutes', 'nownow ', 'noon / Namshi / SIVVI', 'Categorized Earning 1<ul><li>Insurance</li><li>Car Dealership</li><li>Grocery and Supermarkets</li><li>Quick Service Restaurants</li><li>Real Estate</li><li>Education</li><li>Petroleum</li><li>Transit</li><li>Government Services<br><span id="note">(Utility payment done via Dubai Smart Government will not earn points for utility spend because it\'s classified as government services.)</span></li><li>Utility and Telecommunication Payments</li></ul>'],
        earningRate: ['20%', '5% on all Items', '10%', '5%', '0.3%', '1%'],
        example: ['AED 100 → 20 noon credits', 'AED 100 → 5 noon credits', 'AED 100 → 10 noon credits', 'AED 100 → 5 noon credits', 'AED 100 → 0.3 noon credits', 'AED 100 → 1 noon credits'],
        earningRatePercent: [0.2, 0.05, 0.1, 0.05, 0.003],
        rewardExpiry: noonCredits.expiryDetails,
        rewardCap: "2,000 noon credits per month"
    }

    const aldar_Darna_Select = {
        name: "Darna Select",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/aldar_Darna_select_card.png">',
        spendType: ['Aldar locations – retails, groceries, malls, theme parks, hotel.', 'Domestic & International (non-Aldar locations)', 'Aldar Education', 'Aldar Property', 'Grocery Spends (outside Aldar)<br>EU Spends (including UK)', 'Government Spends'],
        earningRate: ['6.5% back as Darna Points', '0.75% back as Darna Points', '10% of base earn rate', '10% of base earn rate', '0.18% back as Darna Points', '0.075% back as Darna Points'],
        example: ['AED 100 → 65 Darna points', 'AED 100 → 7.5 Darna points', 'AED 100 → 6.5 Darna points', 'AED 100 → 6.5 Darna points', 'AED 100 → 1.8 Darna points', 'AED 100 → 0.75 Darna points'],
        earningRatePercent: [0.65, 0.075, 0.065, 0.065, 0.018, 0.0075],
        rewardExpiry: DarnaPoints.expiryDetails,
        rewardCap: "25,000 Darna points per month"
    }

    const aldar_Darna_Signature = {
        name: "Darna Signature",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/aldar_Darna_signature_card.png">',
        spendType: ['Aldar locations – retails, groceries, malls, theme parks, hotel.', 'Domestic & International (non-Aldar locations)', 'Aldar Education', 'Aldar Property', 'Grocery Spends (outside Aldar)<br>EU Spends (including UK)', 'Government Spends'],
        earningRate: ['7.5% back as Darna Points', '1% back as Darna Points', '10% of base earn rate', '10% of base earn rate', '0.25% back as Darna Points', '0.10% back as Darna Points'],
        example: ['AED 100 → 75 Darna points', 'AED 100 → 10 Darna points', 'AED 100 → 7.5 Darna points', 'AED 100 → 7.5 Darna points', 'AED 100 → 2.5 Darna points', 'AED 100 → 1 Darna points'],
        earningRatePercent: [0.75, 0.1, 0.075, 0.075, 0.025, 0.010],
        rewardExpiry: DarnaPoints.expiryDetails,
        rewardCap: "50,000 Darna points per month"
    }

    const aldar_Darna_Infinite = {
        name: "Darna Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/Darna_infinite_card.png">',
        spendType: ['Aldar locations – retails, groceries, malls, theme parks, hotel.', 'Domestic & International (non-Aldar locations)', 'Aldar Education', 'Aldar Property', 'Grocery Spends (outside Aldar)<br>EU Spends (including UK)', 'Government Spends'],
        earningRate: ['10% back as Darna points ', '1.5% back as Darna points', '10% of base earn rate', '10% of base earn rate', '0.375% back as Darna Points', '0.15% back as Darna Points'],
        example: ['AED 100 → 100 Darna points', 'AED 100 → 15 Darna points', 'AED 100 → 10 Darna points', 'AED 100 → 10 Darna points', 'AED 100 → 3.75 Darna points', 'AED 100 → 1.5 Darna points'],
        earningRatePercent: [1, 0.15, 0.1, 0.1, 0.0375, 0.015],
        rewardExpiry: DarnaPoints.expiryDetails,
        rewardCap: "100,000 Darna points per month"
    }

    // ! NEW CARD
    const share_visa_infinite_card = {
        name: "SHARE Visa Infinite",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/share_visa_infinite_card.png">',
        spendType: ['Spends in SHARE (MAF) Ecosystem', 'General Domestic / International Spends at non- SHARE locations', 'Petroleum, transit, government services, utility payments, real estate, education and telecommunication', 'Grocery and supermarkets, fast-food restaurants, insurance and car dealerships (outside SHARE)', 'EU Spends (including United Kingdom)'],
        earningRate: ['8% back as SHARE points', '1.5% back as SHARE points', '0.15% back as SHARE points', '0.375% back as SHARE points', '0.375% back as SHARE points'],
        example: ['AED 100 → 80 SHARE points', 'AED 100 → 15 SHARE points', 'AED 100 → 1.5 SHARE points', 'AED 100 → 3.75 SHARE points', 'AED 100 → 3.75 SHARE points'],
        earningRatePercent: [0.8, 0.15, 0.015, 0.0375, 0.0375],
        rewardExpiry: sharePoints.expiryDetails,
        rewardCap: "100,000 SHARE points per month"
    }
    
    const share_visa_signature_card = {
        name: "SHARE Visa Signature",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/share_visa_signature_card.png">',
        spendType: [ "Spends in SHARE (MAF) Ecosystem", "General Domestic / International Spends at non- SHARE locations", "Petroleum, transit, government services, utility payments, real estate, education and telecommunication", "Grocery and supermarkets, fast-food restaurants, insurance and car dealerships (outside SHARE)", "EU Spends (including United Kingdom)" ],
        earningRate: [ "6% back as SHARE points", "1% back as SHARE points", "0.10% back as SHARE points", "0.25% back as SHARE points", "0.25% back as SHARE points"],
        example: ["AED 100 → 60 SHARE points", "AED 100 → 10 SHARE points", "AED 100 → 1 SHARE point", "AED 100 → 2.5 SHARE points", "AED 100 → 2.5 SHARE points"],
        earningRatePercent: [0.6, 0.1, 0.01, 0.025, 0.025],
        rewardExpiry: sharePoints.expiryDetails,
        rewardCap: "50,000 SHARE points per month"
    }
    
    const share_visa_platinum_card = {
        name: "SHARE Visa Platinum",
        cardImage: '<img class="cardImage animate__animated animate__zoomInLeft noonOne" src="/sites/GCE/public/SiteAssets/mediafiles/images/CCImages/share_visa_platinum_card.png">',
        spendType: [ "Spends in SHARE (MAF) Ecosystem", "General Domestic / International Spends at non- SHARE locations", "Petroleum, transit, government services, utility payments, real estate, education and telecommunication", "Grocery and supermarkets, fast-food restaurants, insurance and car dealerships (outside SHARE)", "EU Spends (including United Kingdom)" ],
        earningRate: [ "4% back as SHARE points", "0.75% back as SHARE points", "0.075% back as SHARE points", "0.19% back as SHARE points", "0.19% back as SHARE points"],
        example: [ "AED 100 → 40 SHARE points", "AED 100 → 7.5 SHARE points", "AED 100 → 0.75 SHARE points", "AED 100 → 1.9 SHARE points", "AED 100 → 1.9 SHARE points"],
        earningRatePercent: [0.4, 0.075, 0.0075, 0.019, 0.019],
        rewardExpiry: sharePoints.expiryDetails,
        rewardCap: "25,000 SHARE points per month"
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
        if (comments == undefined) {
            $("#comments").html("")
            // console.log("comments == undefined");
        } else {
            $("#comments").html(comments)
            // console.log("comments !== undefined");
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
            addCardComments2Page("Important Note: <i style='color: red;'>Kindly note to check and inform the correct earning percentage based on the customer's spend criteria.</i>")
            cardProfile = duoCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${pPoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${pPoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: <i style='color: red;'>Kindly note to check and inform the correct earning percentage based on the customer's spend criteria.</i></li>
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
            addCardComments2Page(etihadMiles.notes);
            cardProfile = elevateCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${etihadMiles.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${etihadMiles.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: ${etihadMiles.notes}</li>
        </ul`);
        }
        else if (selectedCard == "Etihad Inspire Card") {
            nonUSDCards();
            addCardComments2Page(etihadMiles.notes);
            cardProfile = inspireCard;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${etihadMiles.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${etihadMiles.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: ${etihadMiles.notes}</li>
        </ul`);
        }
        else if (selectedCard == "Darna Select") {
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
        else if (selectedCard == "Darna Signature") {
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
        else if (selectedCard == "Darna Infinite") {
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
        else if (selectedCard == "SHARE Visa Platinum") {
            console.log(selectedCard);
            nonUSDCards();
            addCardComments2Page(sharePoints.notes);
            cardProfile = share_visa_platinum_card;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${sharePoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${sharePoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: ${sharePoints.notes}</li>
        </ul`);
        }
        else if (selectedCard == "SHARE Visa Infinite") {
            console.log(selectedCard);
            nonUSDCards();
            addCardComments2Page(sharePoints.notes);
            cardProfile = share_visa_infinite_card;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${sharePoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${sharePoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: ${sharePoints.notes}</li>
        </ul`);
        }
        else if (selectedCard == "SHARE Visa Signature") {
            console.log(selectedCard);
            nonUSDCards();
            addCardComments2Page(sharePoints.notes);
            cardProfile = share_visa_signature_card;
            $(".selectedCardDescription").html(`<ul>
            <li>Card Name: <strong>${cardProfile.name}</strong></li>
            <li>Reward Type: <strong>${sharePoints.rewardName}</strong></li>
            <li>Reward Expiry: <strong>${sharePoints.expiryDetails}</strong></li>
            <li>Reward Capping: <strong>${cardProfile.rewardCap}</strong></li>
            <li>Important Note: ${sharePoints.notes}</li>
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

        console.log(cardName);

        // Ensure the amount is entered
        if (transactionAmount == "") {
            alert("Please specify transaction amount");
            return false;
        }

        // ! NEW CARD
        else if (/noon/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
                $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + noonCredits.rewardName + closeTag);
                // console.log(cardProfile.earningRatePercent[i])
            }
        }
        else if (/SHARE/.test(cardName)) {
            for (var i = 0; i < cardProfile.earningRatePercent.length; i++) {
                $(`#pointsEarned${i}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[i]).toFixed(2) + seperatorSpace + sharePoints.rewardName + closeTag);
            }
        }
        
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
                // console.log(transactionAmount + " is less than 2500")
                $(`#pointsEarned${0}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[0]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
                $(`#pointsEarned${1}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${2}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${3}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[3]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
            }
            else if (transactionAmount > 2499 && transactionAmount < 5000) {
                // console.log(transactionAmount + " is between 2500 and 4999")
                $(`#pointsEarned${0}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${1}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[1]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
                $(`#pointsEarned${2}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${3}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[3]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
            }
            else {
                // console.log(transactionAmount + " does not meet any of the above criteria, this means it is 5000 and above")
                $(`#pointsEarned${0}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${1}`).html(openTag + " - " + closeTag);
                $(`#pointsEarned${2}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[2]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
                $(`#pointsEarned${3}`).html(openTag + (transactionAmount * cardProfile.earningRatePercent[3]).toFixed(2) + seperatorSpace + pPoints.rewardName + closeTag);
            }
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


    // Display calculator instructions
    $(".helpOption").click(function () {
        howToUseCalculator.show();
    })



    /* *********************************************** *\
    The below section includes SharePoint RESTful API
    😎 To Submit Feedback and Suggestions
    😎 To Track number of users
    Author: Oluwatobiloba Raymond Ariwoola 😎
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
                },
                error: function (data) {
                    console.log("Failed: " + data);
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
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('rewardsCalculatorUsers')/items?$expand=Author&$select=Id,numberOfVisits,Author/Title,Author/Department,Author/FirstName,Author/LastName&$filter=(userSPID eq ('" + visitorID + "'))",
            method: "GET",
            async: false,
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                const result = data.d.results;
                if (result.length > 0) {
                    $.each(data.d.results, function (index, item) {
                        _pageHit = {
                            ID: item.ID,
                            count: item.numberOfVisits
                        };
                    });

                    // console.log(result);
                    // console.log(result[0].numberOfVisits);
                    $("#userVisits").html(`You have ${result[0].numberOfVisits} visits`)
                }
                else {
                    setTimeout(() => {
                        howToUseCalculator.show();
                    }, 2000); // Display information after 2000 milli Seconds => 2 Seconds
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
                    console.log("Success: " + data);
                },
                error: function (data) {
                    console.log("Failed: " + data);
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


    /**
     * This section is for Merchant Category Code
     * Modifying this section should ideally not affect any of the above functions.
     */

    const siteUrl = _spPageContextInfo.webAbsoluteUrl;
    const listName = "merchantCatCode";

    $.ajax({
        url: `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Category_Description&$top=1000`,
        method: "GET",
        headers: {
            "Accept": "application/json;odata=verbose"
        },
        success: function (data) {
            const items = data.d.results;
            const tableBody = $("#merchantCatTable tbody");
            tableBody.empty();

            items.forEach(function (item) {
                const row = `
                <tr>
                  <td>${item.Title}</td>
                  <td>${item.Category_Description}</td>
                </tr>`;
                tableBody.append(row);
            });

            // Initialize DataTable
            $('#merchantCatTable').DataTable({
                responsive: true,
            });
        },
        error: function (error) {
            console.error("Error fetching SharePoint list data", error);
        }
    });


    // create modal object
    const mccModal = new bootstrap.Modal(document.getElementById('mccModalDescription'), {
        keyboard: false
    });

    // When user clicks to see card details button
    $("#SeeMCC").click(function () {
        mccModal.show();
    });





});

