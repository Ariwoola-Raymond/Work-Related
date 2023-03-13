

function getFilesInFolder(folderUrl, successCallback, errorCallback) {
    var siteUrl = "<site url>";
    var listTitle = "Knowledge Management";
    var folderPath = siteUrl + "/_api/web/lists/GetByTitle('" + listTitle + "')/items?$select=FileLeafRef&$filter=FileSystemObjectType eq 0 and FileDirRef eq '" + folderUrl + "'";

    $.ajax({
        url: folderPath,
        type: "GET",
        headers: { "Accept": "application/json;odata=verbose" },
        success: function (data) {
            var files = [];
            $.each(data.d.results, function (i, result) {
                files.push(result.FileLeafRef);
            });
            successCallback(files);
        },
        error: function (data) {
            errorCallback(data);
        }
    });
}



// Set the folder URL to the desired folder, relative to the document library root
let folderUrl = "/Knowledge Management/Subfolder1/Subfolder2/Subfolder3/Subfolder4/Subfolder5/Subfolder6"

// Call the getFilesInFolder() function with the folder URL and callback functions
getFilesInFolder(folderUrl, function (files) {
    // Log the retrieved file names to the console
    console.log("Files in folder:");
    console.log(files);
}, function (error) {
    // Log any errors to the console
    console.log("Error retrieving files:");
    console.log(error);
});
