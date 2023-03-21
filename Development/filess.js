const months=["January","February","March","April","May","June","July","August","September","October","November","December"];date=new Date,refinedDate=`${months[date.getMonth()]} ${date.getDate()}`;const regExp=/[0-9]/,userID=getUser().userId,cifLength=8,className=["bounce","shakeX","shakeY","pulse","backInUp","backInDown","bounceIn","fadeInUp","lightSpeedInLeft"],label_Contact=["Accounts","Credit_card","Debit_card","Liv_Cash","Liv_Insurance","Liv_Prime","Liv_USD","Liv_Young"],dateOptions={weekday:"long",year:"numeric",month:"long",day:"numeric"},dateNow=new Date().toLocaleDateString("en-US",dateOptions);$(document).ready(function(){$("#dateToday").val(dateNow)}),$("#staffName").val(getUser().fullName);var myAlert=document.getElementById("toastNotice"),bsAlert=new bootstrap.Toast(myAlert,{animation:!0,autohide:!0,delay:5e3}),rand=function(){var a=Math.random();return a=Math.floor(a*className.length),a};$("#layout3").addClass("animate__"+className[rand()]);var uniqueLabels,uniqueSubLabels,tempArrLabels=[],tempArrSubLabels=[];function loadLabelS(a){gettItems(a,null)}function loadSubLabels(a){var b=$("#labelViaCont").val();gettItems(b,a)}function createLabelSelection(){$("#LabelVal").html(""),$("#subLabeled").html(""),$("#LabelVal").append("<option value=\"\">--Select--</option>"),uniqueLabels.forEach(a=>$("#LabelVal").append(`<option value="${a}">${a}</option>`))}function createSubLabelSelection(){$("#subLabeled").html(""),uniqueSubLabels.forEach(a=>$("#subLabeled").append(`<option value="${a}">${a}</option>`))}function gettItems(a,b){null==b?tempArrLabels=[]:tempArrSubLabels=[];var c=null==b?"(labelVIaContact eq  '"+a+"')&$orderby=Label asc":"(Label eq '"+b+"') and (labelVIaContact eq '"+a+"')&$select=subLabel&$orderby=subLabel asc";var d=_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('Liv_Pending_Chat')/items?$top=1000&$filter="+c;$.ajax({url:d,type:"GET",headers:{accept:"application/json; odata=verbose"},success:function(a){var c=a.d.results;null==b?c.forEach(a=>tempArrLabels.push(a.Label)):c.forEach(a=>tempArrSubLabels.push(a.subLabel)),null==b?getUniqs("L"):getUniqs("subL")},error:function(){console.log("Error")}})}function getUniqs(a){"subL"==a?uniqueSubLabels=[]:uniqueLabels=[],"subL"==a?uniqueSubLabels=tempArrSubLabels.filter(onlyUnique):uniqueLabels=tempArrLabels.filter(onlyUnique),"subL"==a?createSubLabelSelection():createLabelSelection()}function onlyUnique(a,b,c){return c.indexOf(a)===b}function submitRecord(){const a=$("#emailID").val(),b=$("#labelViaCont").val(),c=$("#LabelVal").val(),d=$("#subLabeled").val();console.log([a,b,c,d]);var e={__metadata:{type:"SP.Data.Liv_x005f_Chats_x005f_labelingListItem"},Title:`${userID}`,Mobile_Number:a,Label_via_Contact_type:b,Label:c,Sub_Label:d,manualDateToday:refinedDate};""==a||null==a||""==b||""==c||null==c||""==d||null==d?alert("Please fill all fields"):(addItemToList(e),bsAlert.show(),setTimeout(()=>{window.location.reload()},500))}function addItemToList(a){$.ajax({url:_spPageContextInfo.webAbsoluteUrl+"/_api/Web/Lists/GetByTitle('Liv_Chats_labeling_Report')/items",type:"POST",async:!1,contentType:"application/json;odata=verbose",data:JSON.stringify(a),headers:{Accept:"application/json;odata=verbose","X-RequestDigest":$("#__REQUESTDIGEST").val()},success:function(a){console.log(a)},error:function(a){console.log(a)}})}




const m=["January","February","March","April","May","June","July","August","September","October","November","December"],d=new Date,rd=${m[d.getMonth()]} ${d.getDate()},re=/[0-9],uid=getUser().userId,cl=8,c=["bounce","shakeX","shakeY","pulse","backInUp","backInDown","bounceIn","fadeInUp","lightSpeedInLeft"],lc=["Accounts","Credit_card","Debit_card","Liv_Cash","Liv_Insurance","Liv_Prime","Liv_USD","Liv_Young"],o={weekday:"long",year:"numeric",month:"long",day:"numeric"},dn=new Date().toLocaleDateString("en-US",o);$(document).ready(()=>$("#dateToday").val(dn)),$("#staffName").val(getUser().fullName);var a=document.getElementById("toastNotice"),b=new bootstrap.Toast(a,{animation:!0,autohide:!0,delay:5e3});$("#layout3").addClass(animate__${c[(()=>{var a=Math.random();return Math.floor(a*c.length)})()]});var ul,usl,t=[],ts=[];function l(a){g(a,null)}function ls(a){var b=$("#labelViaCont").val();g(b,a)}function cls(){$("#LabelVal").html(""),$("#subLabeled").html(""),$("#LabelVal").append("<option value="">--Select--</option>"),ul.forEach(a=>$("#LabelVal").append(<option value="${a}">${a}</option>))}function csl(){$("#subLabeled").html(""),usl.forEach(a=>$("#subLabeled").append(<option value="${a}">${a}</option>))}function g(a,b){null==b?t=[]:ts=[];var c=null==b?"(labelVIaContact eq '"+a+"')&$orderby=Label asc":"(Label eq '"+b+"') and (labelVIaContact eq '"+a+"')&$select=subLabel&$orderby=subLabel asc";var d=_spPageContextInfo.webAbsoluteUrl+"/_api/web/lists/getbytitle('Liv_Pending_Chat')/items?$top=1000&$filter="+c;$.ajax({url:d,type:"GET",headers:{accept:"application/json; odata=verbose"},success:function(c){var d=c.d.results;null==b?d.forEach(c=>t.push(c.Label)):d.forEach(c=>ts.push(c.subLabel)),null==b?u("L"):u("subL")},error:()=>console.log("Error")})}function u(a){"subL"==a?usl=[]:ul=[],"subL"==a?usl=ts.filter(o):ul=t.filter(o),"subL"==a?csl():cls()



Why are we still using the legacy tool?
We have identified several throttling issues on the legacy system in the past for which I created a newer version of the tool. We did a pilot using 2 agents and other agents were supposed to be migrated onto the new tool.
Please understand that these tools takes several hours and days to develop (outside my BAUs & pro) only for them to not be used.
Even if KM access is provided to the below users, this wouldn’t change the fact that the tool is on it’s last leg and can suddenly stop working due or be completely unusable. I highly recommend that you migrate your agents to the new tool since the new tool was built outside KM with no dependency on KM access.
Lastly, as discussed from the onset of the tool creation, this was supposed to be a temporary solution until the people at Freshworks are able to provide the appropriate inbuilt system functionality. Having the tool on SharePoint is not sustainable and given my new job role, I may not be able to support the team with the maintenance of the tool.



const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    const regExp = /[0-9]/;
                    const userID = _spPageContextInfo.userId;
                    const fullName = _spPageContextInfo.userDisplayName;
                    const className = ["bounce", "shakeX", "shakeY", "pulse", "backInUp", "backInDown", "bounceIn", "fadeInUp", "lightSpeedInLeft"];
                    const label_Contact = ["Accounts", "Credit_card", "Debit_card", "Liv_Cash", "Liv_Insurance", "Liv_Prime", "Liv_USD", "Liv_Young"];

                    function dateTimeNow() {
                        const dateTimeOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                        const dateOnlyOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        const dateTimeNow = new Date().toLocaleDateString('en-US', dateTimeOptions);
                        const dateOnlyNow = new Date().toLocaleDateString('en-US', dateOnlyOptions);
                        const dateOnlyMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
                        const dateDayMonthOnly = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
                        const yearOnly = new Date().toLocaleDateString('en-US', {  year: 'numeric' });
                        return { dateTimeNow, dateOnlyNow, dateOnlyMonth, dateDayMonthOnly, yearOnly };
                    }


                    const filters = "(SPTUID eq '" + userID + "') and (Date eq '" + dateTimeNow().dateDayMonthOnly + "')";
                    GetItemWithCB(filters, (cb) => {
                        if (cb.d.results.length > 0) {
                            const logItems = JSON.parse(cb.d.results[0]["Content"]);
                            const logCount = logItems.length > 100 ? `100+` : logItems.length;
                            $("#labelsCount").html(`${logCount}`);
                            $(".bs-badge").fadeIn(1000);
                        }
                    });

                    $(document).ready(function () {
                        $("#dateToday").val(dateTimeNow().dateOnlyNow); // Today's date
                        $("#staffName").val(fullName);
                    });


                    let myAlert = document.getElementById('toastNotice');
                    let bsAlert = new bootstrap.Toast(myAlert, {
                        animation: true,
                        autohide: true,
                        delay: 5000
                    }); //inizialize toast


                    // generate random number
                    let rand = function () {
                        let randomNumber = Math.random();
                        randomNumber = Math.floor(randomNumber * className.length);
                        return randomNumber;
                    }

                    // Generate random animation every time the page loads
                    $("#layout3").addClass("animate__" + className[rand()]);

                    let tempArrLabels = [];
                    let tempArrSubLabels = [];
                    let uniqueLabels; // holds the unique values of "Label via Contact type"
                    let uniqueSubLabels; // holds the unique values of "Label via Contact type"


                    function loadLabelS(lctval) {
                        gettItems(lctval, null)
                    }

                    function loadSubLabels(subLab) {
                        let firstLabelVal = $("#labelViaCont").val();
                        gettItems(firstLabelVal, subLab);
                    }


                    function createLabelSelection() {
                        $("#LabelVal").html("");
                        $("#subLabeled").html("");
                        $("#LabelVal").append('<option value="">--Select--</option>');
                        uniqueLabels.forEach(x => $("#LabelVal").append(`<option value="${x}">${x}</option>`));
                    }

                    function createSubLabelSelection() {
                        $("#subLabeled").html("");
                        uniqueSubLabels.forEach(x =>
                            $("#subLabeled").append(`<option value="${x}">${x}</option>`));
                    }


                    //! Get items from Sharepoint List
                    function gettItems(firstLabel, secondLabel) {
                        secondLabel != null ? tempArrSubLabels = [] : tempArrLabels = [];
                        let getLabels = "(Title eq  '" + firstLabel + "')&$orderby=Label asc";
                        let getSubLabels = "(Label eq '" + secondLabel + "') and (Title eq '" + firstLabel + "')&$select=subLabel&$orderby=subLabel asc";
                        let getObjetValue;
                        secondLabel != null ? getObjetValue = getSubLabels : getObjetValue = getLabels;
                        let requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Liv_Chat_Labels')/items?$top=1000&$filter=" + getObjetValue;
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
                            let objItems = data.d.results;
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
                        const mobileNumber = $("#mobileNumber").val();
                        const segment = $("#segment").val();
                        const _firstLabel = $("#labelViaCont").val();
                        const _secondLabel = $("#LabelVal").val();
                        const _thirdLabel = $("#subLabeled").val();

                        console.log(dateTimeNow().yearOnly);

                        // Ensure we do not submit blanks
                        if (mobileNumber == "" || mobileNumber == null || segment == "" || _firstLabel == "" || _secondLabel == "" || _secondLabel == null || _thirdLabel == "" || _thirdLabel == null) {
                            alert("Please fill all fields correctly");
                            return false;
                        }

                        $("button,input,select").prop("disabled", true);

                        const content = {
                            "Mob": mobileNumber,
                            "Segment": segment,
                            "Label1": _firstLabel,
                            "Label2": _secondLabel,
                            "Label3": _thirdLabel,
                            "Date": dateTimeNow().dateTimeNow,
                        };

                        const filters = "(SPTUID eq '" + userID + "') and (Date eq '" + dateTimeNow().dateDayMonthOnly + "')";
                        GetItemWithCB(filters, (data) => {
                            if (data.d.results.length === 0) {
                                console.log("New entry for today")
                                const item = {
                                    "__metadata": {
                                        "type": "SP.Data.Liv_x005f_Chats_x005f_labeling_x005f_ReportListItem"
                                    },
                                    "Title": _spPageContextInfo.userEmail.split("@")[0],
                                    "SPTUID": userID.toString(),
                                    "Date": dateTimeNow().dateDayMonthOnly,
                                    "Month": dateTimeNow().dateOnlyMonth,
                                    "Year": dateTimeNow().yearOnly,
                                    "Content": `[${JSON.stringify(content)}]`
                                };
                                
                                
                                addItemToList(item); // Add new Item
                            } else {
                                const ExistingContent = JSON.parse(data.d.results[0].Content);
                                const itemID = data.d.results[0]["ID"];
                                ExistingContent.push(content);
                                const item = {
                                    "__metadata": {
                                        "type": "SP.Data.Liv_x005f_Chats_x005f_labeling_x005f_ReportListItem"
                                    },
                                    "Content": `${JSON.stringify(ExistingContent)}`
                                };
                                updateSpecificListItem(item, itemID)// Update existing Item
                                console.log("update existing entry for today")
                            }
                        })
                    }


                    function GetItemWithCB(options, callback) {
                        $.ajax({
                            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Liv_Chats_labeling_Report')/items?$filter=" + options,
                            method: "GET",
                            async: true,
                            headers: {
                                "Accept": "application/json; odata=verbose"
                            },
                            success: function (data) {
                                callback(data)
                            },
                            error: function (error) {
                                console.log(error)
                            }
                        });
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
                                reload();
                            },
                            error: function (err) {
                                alert("There was an error, please refresh and try again  or contact TL");
                                console.log(err);
                            }
                        });
                    }

                    // Update specific item on the list
                    function updateSpecificListItem(items, itemID) {
                        $.ajax({
                            url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Liv_Chats_labeling_Report')/items(" + itemID + ")",
                            type: "POST",
                            data: JSON.stringify(items),
                            contentType: "application/json;odata=verbose",
                            headers: {
                                "Accept": "application/json;odata=verbose",
                                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                                "X-HTTP-Method": "MERGE",
                                "If-Match": "*"
                            },
                            success: function (data) {
                                // reload();
                            },
                            error: function (err) {
                                alert("There was an error, please refresh and try again or contact TL");
                                console.log(err);
                            }
                        });
                    }

                    function reload() {
                        //show submission alert
                        bsAlert.show();

                        // refresh page after 500 milliseconds
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }


                    $(".todayItems").on("click", () => {
                        location.href = "liv-label-UserPage.aspx";
                    })
