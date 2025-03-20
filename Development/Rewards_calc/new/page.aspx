
<!DOCTYPE html>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls"
    Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

    <head>
        <!-- 
/* *********************************************** *\
Emirates NBD Credit Cards Reward Calculator APP
Author: Oluwatobiloba Raymond Ariwoola
\* *********************************************** */
-->
        <title>Credit Card Rewards Calculator</title>
        <meta name="Author" content="Oluwatobiloba Raymond Ariwoola">

        <!-- Ensure user is using the right browser -->
        <script>
            var is_EdgeChrome = ((navigator.userAgent.toLowerCase().indexOf('edg') > -1) || (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (navigator.vendor.toLowerCase().indexOf("google") > -1));
            if (is_EdgeChrome == false) {
                alert("Please use Google Chrome or Microsoft Edge browser");
                window.location.href = "https://askkmpro-stg.sso.verint-km.com/enterprise/enbd";
            }
        </script>


        <!-- Additional libraries -->
        <link rel="stylesheet" href="/sites/GCE/public/SiteAssets/css/third-party/bootstrap.min.css">
        <link rel="stylesheet" href="/sites/GCE/public/SiteAssets/css/third-party/animate.min.css">
        <link rel="stylesheet" type="text/css" href="/sites/GCE/public/SiteAssets/css/third-party/font-awesome.css">

        <!-- Calculator CSS -->
        <style>
            body {
                overflow-x: hidden;
            }

            .selectedCard {
                display: inline-flex;
                width: 100%;
            }

            a.navbar-brand {
                color: white !important;
            }

            nav.navbar.fixed-top.navbar-light {
                background: rgb(0, 163, 214);
                font-weight: bold;
            }

            thead {
                background: silver;
            }

            .animate__animated {
                animation-duration: 1s;
            }

            .selectedCardDescription ul {
                line-height: 2;
            }

            .horizontalCard {
                width: 190px;
                height: 120px;
            }

            .verticalCard {
                width: 120px;
                height: 190px;
            }

            .noonOne {
                height: 130px;
            }

            .paddingBottom {
                padding-bottom: 5%;
            }

            .container-fluid {
                padding-right: var(--bs-gutter-x, 2rem);
                padding-left: var(--bs-gutter-x, 2rem);
            }

            th {
                width: 20%;
            }

            .pointsResult {
                font-weight: bold;
                font-family: var(--bs-font-sans-serif);
                font-size: x-large;
                animation-name: glow, zoomInRight;
                animation-duration: 5s, 2s;
                animation-iteration-count: infinite, 1;
                animation-direction: alternate-reverse, normal;
            }

            .footer {
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                background-color: red;
                color: white;
                text-align: center;
            }

            @keyframes glow {
                0% {
                    color: black;
                }

                50% {
                    color: var(--bs-purple);
                }

                100% {
                    color: var(--bs-pink);
                }
            }

            #SeeCardDetails {
                display: none;
            }

            h1.text-center {
                position: absolute;
                left: 35%;
                color: white;
            }

            body::-webkit-scrollbar {
                width: 0.7rem;
            }

            body::-webkit-scrollbar-track {
                background-color: red;
            }

            body::-webkit-scrollbar-thumb {
                background-color: rgb(255, 255, 255);
            }

            body::-webkit-scrollbar-track-piece {
                background-color: rgb(0, 163, 214);
            }

            .howToUseCalcContent h4 {
                text-decoration: underline;
            }

            .howToUseCalcContent h6 {
                font-style: italic;
                font-family: serif;
                font-weight: bold;
            }

            .modal-header {
                background: rgb(0, 163, 214);
                color: white;
            }

            .helpOption {
                color: white;
                font-weight: bold;
                cursor: pointer;
            }

            .moveProgress {
                animation: slidein 5s;
            }

            @keyframes slidein {
                from {
                    width: 0;
                }

                to {
                    width: 100%;
                }
            }

            .failure {
                animation-name: error;
                animation-duration: 1s;
                animation-iteration-count: infinite;
                animation-direction: alternate-reverse;
            }

            @keyframes error {
                0% {
                    border: red 5px ridge;
                }

                50% {
                    border: #ffd5d5 5px ridge;
                }

                100% {
                    border: red 5px ridge;
                }
            }

            fieldset,
            label {
                margin: 0;
                padding: 0;
            }

            body {
                margin: 20px;
            }

            h1 {
                font-size: 1.5em;
                margin: 10px;
            }

            /****** Style Star Rating Widget *****/

            .rating {
                border: none;
                float: left;
            }

            .rating>input {
                display: none;
            }

            .rating>label:before {
                margin: 5px;
                font-size: 1.25em;
                font-family: FontAwesome;
                display: inline-block;
                content: "\f005";
            }

            .rating>.half:before {
                content: "\f089";
                position: absolute;
            }

            .rating>label {
                color: #ddd;
                float: right;
            }

            /***** CSS Magic to Highlight Stars on Hover *****/

            .rating>input:checked~label,
            /* show gold star when clicked */
            .rating:not(:checked)>label:hover,
            /* hover current star */
            .rating:not(:checked)>label:hover~label {
                color: #FFD700;
            }

            /* hover previous stars in list */

            .rating>input:checked+label:hover,
            /* hover current star when changing rating */
            .rating>input:checked~label:hover,
            .rating>label:hover~input:checked~label,
            /* lighten current selection */
            .rating>input:checked~label:hover~label {
                color: #FFED85;
            }

            #SwitchCurrency {
                display: none;
            }
        </style>

        <html xmlns:mso="urn:schemas-microsoft-com:office:office"
            xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
        <!--[if gte mso 9]><SharePoint:CTFieldRefs runat=server Prefix="mso:" FieldList="FileLeafRef,Comments,PublishingStartDate,PublishingExpirationDate,PublishingContactEmail,PublishingContactName,PublishingContactPicture,PublishingPageLayout,PublishingVariationGroupID,PublishingVariationRelationshipLinkFieldID,PublishingRollupImage,Audience,PublishingIsFurlPage,SeoBrowserTitle,SeoMetaDescription,SeoKeywords,RobotsNoIndex"><xml>
<mso:CustomDocumentProperties>
<mso:PublishingContact msdt:dt="string">13</mso:PublishingContact>
<mso:PublishingIsFurlPage msdt:dt="string">0</mso:PublishingIsFurlPage>
<mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_PublishingContact msdt:dt="string">Oluwatobiloba Ariwoola (Tanfeeth CCO)</mso:display_urn_x003a_schemas-microsoft-com_x003a_office_x003a_office_x0023_PublishingContact>
<mso:PublishingContactPicture msdt:dt="string"></mso:PublishingContactPicture>
<mso:PublishingRollupImage msdt:dt="string"></mso:PublishingRollupImage>
<mso:Audience msdt:dt="string"></mso:Audience>
<mso:PublishingContactName msdt:dt="string"></mso:PublishingContactName>
<mso:Comments msdt:dt="string"></mso:Comments>
<mso:PublishingContactEmail msdt:dt="string"></mso:PublishingContactEmail>
</mso:CustomDocumentProperties>
</xml></SharePoint:CTFieldRefs><![endif]-->
    </head>


    <body>
        <!-- required: SharePoint FormDigest -->
        <form runat="server">
            <SharePoint:FormDigest runat="server"></SharePoint:FormDigest>
        </form>

        <!-- Fixed navigation bar for page header and link back to main KM page -->
        <nav class="navbar fixed-top navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="https://askkmpro-stg.sso.verint-km.com/enterprise/enbd"><span
                        id="goHome"></span>Go Back To KM</a>
                <h1 class="text-center">Credit Card Rewards Calculator</h1>
                <h5 class="helpOption"><span id="hlpEmj1"></span>Need Help <span id="hlpEmj2"></span></h5>
            </div>
        </nav>

        <!-- Lazy Seperators  -->
        <br class="seperatorBR">
        <br class="seperatorBR">
        <br class="seperatorBR">
        <br class="seperatorBR">

        <!-- Card Selection | Transaction Amount | Card Details -->
        <div class="container ">
            <section id="cardSelection">
                <div class="row">
                    <div class="col-lg-6">
                        <select class="form-select form-select-md mb-3" aria-label="form-select-lg" id="cardType">
                            <option selected>-Select Card Type-</option>
                            <option value="DIC"> DIC</option>
                            <option value="Diners Club Card">Diners Club Card</option>
                            <option value="Dnata Platinum">Dnata Platinum</option>
                            <option value="Dnata World">Dnata World</option>
                            <option value="Duo Credit Card">Duo Credit Card</option>
                            <option value="Etihad Elevate Card">Etihad Elevate Card</option>
                            <option value="Etihad Inspire Card">Etihad Inspire Card</option>
                            <option value="Generic Titanium">Generic Titanium</option>
                            <option value="Go4it Gold">Go4it Gold</option>
                            <option value="Go4it Platinum">Go4it Platinum</option>
                            <option value="LuLu 247 Platinum">LuLu 247 Platinum</option>
                            <option value="LuLu 247 Titanium">LuLu 247 Titanium</option>
                            <option value="Manchester United Card">Manchester United Card</option>
                            <option value="Marriott Bonvoy">Marriott Bonvoy&#174; World Mastercard&#174;</option>
                            <option value="Marriott Bonvoy World Elite Mastercard">Marriott Bonvoy&#174; World Elite
                                Mastercard&#174;</option>
                            <option value="MasterCard Platinum">MasterCard Platinum</option>
                            <option value="noon One Visa Platinum">noon One Visa Platinum</option>
                            <option value="Priority Banking Visa Infinite">Priority Banking Visa Infinite</option>
                            <option value="Skywards Infinite">Skywards Infinite</option>
                            <option value="Skywards Signature">Skywards Signature</option>
                            <option value="U by Emaar Family">U by Emaar Family</option>
                            <option value="U by Emaar Infinite">U by Emaar Infinite</option>
                            <option value="U by Emaar Signature">U by Emaar Signature</option>
                            <option value="Visa Flexi"> Visa Flexi</option>
                            <option value="Visa Infinite">Visa Infinite</option>
                            <option value="Visa Platinum">Visa Platinum</option>
                            <option value="Webshopper Card">Webshopper Card</option>
                        </select>

                    </div>
                    <div class="col-lg-6">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="transactionAmount">AED</span>
                            <input type="number" class="form-control" placeholder="Enter Transaction Amount in AED"
                                aria-label="Amount" aria-describedby="transactionAmount" min="0" id="txnAmount"
                                autocomplete=true>
                            <button class="btn btn-outline-primary" type="button" id="SwitchCurrency">Switch
                                Currency</button>
                            <button class="btn btn-outline-success" type="button" id="submit-button">Calculate</button>
                        </div>
                    </div>
                    <button class="btn btn-outline-success" id="SeeCardDetails">See Card Details</button>
                </div>
                <div class="selectedCard position-relative">
                    <div class="modal fade" id="cardDescription" data-bs-backdrop="static" data-bs-keyboard="false"
                        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="cardDescriptionLabel">Card Details</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p class="selectedCardImage">
                                        <!-- Card Image here -->
                                    </p>
                                    <p class="selectedCardDescription">
                                        <!-- Card details here -->
                                    </p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Content Table -->
        <div class="container-fluid">
            <section id="cardTable" class="animate__animated animate__fadeInRight">
                <div class="row">
                    <table class="table table-bordered">
                        <thead>
                            <tr class="text-center">
                                <th scope="col" class="text-start">Spend Type</th>
                                <th scope="col">Earning Rate %</th>
                                <th scope="col">Example</th>
                                <th scope="col">Points Earned</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            <!-- Table Data Here -->
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <!-- Extra space at the end of the page -->
        <div class="paddingBottom"></div>

        <!-- Calculator instruction -->
        <div class="modal fade" id="howToUseCalcModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">How to use this calculator</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="howToUseCalcContent">
                            <h4>Steps</h4><a href="/sites/GCE/public/SiteAssets/mediafiles/videos/RewardsCalculator.mp4"
                                target="seeVid"><small>Watch the video</small></a>
                            <ol>
                                <li>Select Card Type from the dropdown list.</li>
                                <li>Enter the transaction amount in AED.</li>
                                <li>Click <strong>"Calculate"</strong> button.</li>
                            </ol>
                            <hr>
                            <h4>Important Note</h4>
                            <ul>
                                <li>Upon card selection, you will see the card details which includes:
                                    <ul>
                                        <li>Card Name</li>
                                        <li>Reward Type</li>
                                        <li>Reward Expiry</li>
                                        <li>Reward Capping</li>
                                    </ul>
                                </li>
                                <li>Calculation results will be displayed in the <strong>"Points Earned"</strong>
                                    column.
                                </li>
                                <li>Point earned for the entered amount will be shown for all spend/transaction type.
                                </li>
                                <li>You can see how many points should be earned depending on customer's
                                    transaction/spend
                                    type.</li>
                            </ul>
                            <hr>
                            <h6>If you find this tool helpful, please give your feedback and/or suggestion</h6>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#dataStats" data-bs-dismiss="modal"
                            class="btn btn-outline-success viewStatBtn" title="Not Available" disabled>Calculator
                            Stats</button>
                        <button type="button" data-bs-toggle="modal" data-bs-target="#feedbackForm"
                            data-bs-dismiss="modal" class="btn btn-primary sendFeedbackBtn">Send
                            Feedback/Suggestion</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Feedback Form -->
        <div class="modal fade" id="feedbackForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Feedback & Suggestion</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body feedbackModal">
                        <div class="visitorDetails"></div>
                        <br>
                        <div class="progress">
                            <div id="progress" class="progress-bar progress-bar-striped progress-bar-animated"
                                role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                style="width: 0%"></div>
                        </div>
                        <br>

                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-check">
                                    <h3>Rating</h3>
                                    <fieldset class="rating">
                                        <input type="radio" class="starRating" id="star5" name="rating" value="5" />
                                        <label class="full" for="star5" title="Awesome - 5 stars"></label>
                                        <input type="radio" class="starRating" id="star4half" name="rating"
                                            value="4.5" />
                                        <label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                                        <input type="radio" class="starRating" id="star4" name="rating" value="4" />
                                        <label class="full" for="star4" title="Pretty good - 4 stars"></label>
                                        <input type="radio" class="starRating" id="star3half" name="rating"
                                            value="3.5" />
                                        <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                                        <input type="radio" class="starRating" id="star3" name="rating" value="3" />
                                        <label class="full" for="star3" title="Meh - 3 stars"></label>
                                        <input type="radio" class="starRating" id="star2half" name="rating"
                                            value="2.5" />
                                        <label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                                        <input type="radio" class="starRating" id="star2" name="rating" value="2" />
                                        <label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                                        <input type="radio" class="starRating" id="star1half" name="rating"
                                            value="1.5" />
                                        <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                                        <input type="radio" class="starRating" id="star1" name="rating" value="1" />
                                        <label class="full" for="star1" title="Sucks big time - 1 star"></label>
                                        <input type="radio" class="starRating" id="starhalf" name="rating"
                                            value="0.5" />
                                        <label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div>
                                    <h3>Category:</h3>
                                    <div>
                                        <input id="feedback" name="category" type="radio" class="starRating"
                                            class="form-check-input" value="Feedback" checked required>
                                        <label class="form-check-label" for="feedback">Feedback</label>
                                    </div>
                                    <div>
                                        <input id="suggestion" name="category" type="radio" class="starRating"
                                            class="form-check-input" value="Suggestion" required>
                                        <label class="form-check-label" for="suggestion">Suggestion</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave your comment here" id="comment"
                                style="height: 200px;"></textarea>
                            <label for="comment">Comments</label>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary submitFeedback">Submit</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>


        <!-- Supporting KM js & Libraries -->
        <script type="text/javascript" src="/sites/GCE/public/SiteAssets/javascript/third-party/jquery.min.js"></script>
        <script type="text/javascript"
            src="/sites/GCE/public/SiteAssets/javascript/third-party/bootstrap.bundle.min.js"></script>

        <!-- Calculator JS -->
        <!-- <script src="/sites/GCE/public/SiteAssets/javascript/CC-rewards-calc/calculator.js?version=5"></script> -->
        <script src="script.js"></script>


    </body>
    </html>
