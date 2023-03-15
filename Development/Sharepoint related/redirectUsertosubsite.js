https://workplace.emiratesnbd.com/sites/GCE/Pages/PageNotFoundError.aspx?requestUrl=https://workplace.emiratesnbd.com/sites/GCE/CXBooth/Pages/home.asspx
   
var str = "https://workplace.emiratesnbd.com/sites/GCE/Pages/PageNotFoundError.aspx?requestUrl=https://workplace.emiratesnbd.com/sites/GCE/CXBooth/Pages/home.asspx";
var regex = /GCE\/[^\/]*\/Pages/;
var result = regex.exec(str);
if (result) {
    var extractedText = result[0].replace("GCE/", "").replace("/Pages", "");
    console.log(extractedText);
}



document.addEventListener("DOMContentLoaded", function() {
      var refererURL = document.referrer;
      if (refererURL.indexOf("/sites/") !== -1) {
         window.location.href = refererURL;
      }
   });





    document.addEventListener("DOMContentLoaded", function () {
        var webUrl = _spPageContextInfo.webAbsoluteUrl;
        var apiUrl = webUrl + "/_api/web/webs?$select=Title&$top=1&$orderby=Id asc";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", apiUrl, true);
        xhr.setRequestHeader("Accept", "application/json;odata=verbose");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.d.results.length > 0) {
                    var firstSubSiteName = response.d.results[0].Title;
                    console.log("First subsite name: " + firstSubSiteName);
                }
            }
        };
        xhr.send();
    });

