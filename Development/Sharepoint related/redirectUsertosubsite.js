
   document.addEventListener("DOMContentLoaded", function() {
      var refererURL = document.referrer;
      if (refererURL.indexOf("/sites/") !== -1) {
         window.location.href = refererURL;
      }
   });
