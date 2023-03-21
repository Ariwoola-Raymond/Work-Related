
        const months = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
        date = new Date();
        refinedDate = `${months[date.getMonth()]} ${date.getDate()}`;

        const regExp = /[0-9]/;
        const userID = getUser().userId;
        const cifLength = 8;
        const className = ["bounce", "shakeX", "shakeY", "pulse", "backInUp", "backInDown", "bounceIn", "fadeInUp", "lightSpeedInLeft"];
        // const label_Contact = ["CC_Complaint", "CC_Follow up", "CC_Query", "CC_SR", "Complaint", "Email Clean up", "Email Ignored", "Feedback", "Follow up", "Metlife", "PL_Query", "PL_Complaint", "Prime", "Query", "SR"];
        const label_Contact = ["Accounts","Credit_card","Debit_card","Liv_Cash","Liv_Insurance","Liv_Prime","Liv_USD","Liv_Young"];
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateNow = new Date().toLocaleDateString('en-US', dateOptions);

        $(document).ready(function () {
            $("#dateToday").val(dateNow); // Today's date
        })

        $("#staffName").val(getUser().fullName);

        var myAlert = document.getElementById('toastNotice');
        var bsAlert = new bootstrap.Toast(myAlert, {
            animation: true,
            autohide: true,
            delay: 5000
        }); //inizialize toast


        // generate random number
        var rand = function () {
            var randomNumber = Math.random();
            randomNumber = Math.floor(randomNumber * className.length);
            return randomNumber;
        }

        // Generate random animation every time the page loads
        $("#layout3").addClass("animate__" + className[rand()]);

        var tempArrLabels = [];
        var tempArrSubLabels = [];
        var uniqueLabels; // holds the unique values of "Label via Contact type"
        var uniqueSubLabels; // holds the unique values of "Label via Contact type"


        function loadLabelS(lctval) {
            gettItems(lctval, null)
        }

        function loadSubLabels(subLab) {
            var firstLabelVal = $("#labelViaCont").val();
            gettItems(firstLabelVal, subLab);
        }

        
        function createLabelSelection() {
            $("#LabelVal").html("");
            $("#subLabeled").html("");
            $("#LabelVal").append('<option value="">--Select--</option>')
            uniqueLabels.forEach(x =>
                $("#LabelVal").append(`<option value="${x}">${x}</option>`));
        }

        function createSubLabelSelection() {
            $("#subLabeled").html("");
            uniqueSubLabels.forEach(x =>
                $("#subLabeled").append(`<option value="${x}">${x}</option>`));
        }


        //! Get items from Sharepoint List
        function gettItems(firstLabel, secondLabel) {
            secondLabel != null ? tempArrSubLabels = [] : tempArrLabels = [];
            var getLabels = "(labelVIaContact eq  '" + firstLabel + "')&$orderby=Label asc";
            var getSubLabels = "(Label eq '" + secondLabel + "') and (labelVIaContact eq '" + firstLabel + "')&$select=subLabel&$orderby=subLabel asc"; 
            var getObjetValue;
            secondLabel != null ? getObjetValue = getSubLabels : getObjetValue = getLabels;
            var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Liv_Pending_Chat')/items?$top=1000&$filter=" + getObjetValue;
            $.ajax({
                url: requestUri,
                type: "GET",
                headers: {
                    "accept": "application/json; odata=verbose"
                },
                success: onSuccess,
                error: onError
            });
            function onSuccess(data) {
                var objItems = data.d.results;

                secondLabel != null ? objItems.forEach(x => tempArrSubLabels.push(x.subLabel)) : objItems.forEach(x => tempArrLabels.push(x.Label));
                secondLabel != null ? getUniqs("subL") : getUniqs("L");
            }
            function onError(error) {
                console.log('Error');
            };
        }

        function getUniqs(p) {
            p == "subL" ? uniqueSubLabels = [] : uniqueLabels = [];
            p == "subL" ? uniqueSubLabels = tempArrSubLabels.filter(onlyUnique) : uniqueLabels = tempArrLabels.filter(onlyUnique);
            p == "subL" ? createSubLabelSelection() : createLabelSelection();
        }
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }


        function submitRecord() {
            const email = $("#emailID").val();
            const _firstLabel = $("#labelViaCont").val();
            const _secondLabel = $("#LabelVal").val();
            const _thirdLabel = $("#subLabeled").val();


            console.log([email, _firstLabel, _secondLabel, _thirdLabel]);

            var items = {
                "__metadata": {
                    "type": "SP.Data.Liv_x005f_Chats_x005f_labelingListItem"
                },
                "Title": `${userID}`,
                "Mobile_Number": email,
                "Label_via_Contact_type": _firstLabel,
                "Label": _secondLabel,
                "Sub_Label": _thirdLabel,
                "manualDateToday": refinedDate
            };

            //     // Ensure we do not submit blanks
            if (email == "" || email == null || _firstLabel == "" || _secondLabel == "" || _secondLabel == null || _thirdLabel == "" || _thirdLabel == null) {
                alert("Please fill all fields");
            } else {
                // add item to database
                addItemToList(items);

                //show submission alert
                bsAlert.show();

                // refresh page after 500 milliseconds
                setTimeout(() => {
                    window.location.reload();
                }, 500);

            }

        }


        // Add items to database
        function addItemToList(item) {
            $.ajax({
                url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Liv_Chats_labeling_Report')/items",
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
