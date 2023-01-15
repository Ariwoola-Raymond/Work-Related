#### You can use JavaScript to read the contents of Excel files stored on a SharePoint File Library by using the SharePoint REST API. Here is an example of how you can do this:

First, you'll need to create a SharePoint App or add a Script Editor web part to the SharePoint page where you want to read the Excel files.

Next, you'll need to use the SharePoint REST API to retrieve the contents of the Excel file. You can do this by making an HTTP GET request to the following URL:


`https://<siteurl>/_api/web/lists/getbytitle('<listname>')/items?$filter=FileLeafRef eq '<filename>.xlsx'`


Replace `<siteurl>` with the URL of your SharePoint site, `<listname>` with the name of the SharePoint list where the Excel file is stored, and `<filename>` with the name of the Excel file you want to read.

Once you have the JSON data returned from the REST API call, you can parse it and extract the contents of the Excel file. You can then use JavaScript libraries like SheetJS or ExcelJS to read the contents of the file.

If the Excel file is stored in a folder, you will need to include the folder name in the filter and in the FileLeafRef parameter.


`https://<siteurl>/_api/web/lists/getbytitle('<listname>')/items?$filter=FileLeafRef eq '<foldername>/<filename>.xlsx'`

It's important to note that to access the **SharePoint REST API**, you'll need to authenticate with SharePoint. You can use the SharePoint **JavaScript Client Object Model (JSOM)** or the SharePoint REST API to authenticate.

Also, it's important to keep in mind that the Excel file should be stored in a SharePoint library that allows anonymous access or that the user running the script has permission to read the files in the library.




<hr>


#### If you want to read through all the Excel files in a specific folder in a SharePoint File Library, you can modify the REST API call to retrieve all the files in that folder instead of just one specific file. Here's an example of how you can do this:

First, you'll need to determine the folder ID of the folder that contains the Excel files. You can do this by making an HTTP GET request to the following URL:


`https://<siteurl>/_api/web/folders/getByServerRelativeUrl('<foldername>')`

Replace `<siteurl>` with the URL of your SharePoint site, and `<foldername>` with the server relative URL of the folder you want to read from.

Once you have the folder ID, you can use it to retrieve all the Excel files in that folder. You can do this by making an HTTP GET request to the following URL:


`https://<siteurl>/_api/web/lists/getbytitle('<listname>')/items?$filter=FileDirRef eq '<folderID>' and File_x0020_Type eq 'Microsoft_x0020_Excel_x0020_Worksheet'`

Replace `<siteurl>` with the URL of your SharePoint site, `<listname>` with the name of the SharePoint list where the Excel files are stored, and `<folderID>` with the folder ID you obtained in step 1.

Once you have the JSON data returned from the REST API call, you can parse it and extract the contents of the Excel files. You can then use JavaScript libraries like SheetJS or ExcelJS to read the contents of each file.

You can then use a loop to iterate through the files and read their contents.

It's important to keep in mind that to access the SharePoint REST API, you'll need to authenticate with SharePoint. You can use the SharePoint JavaScript Client Object Model (JSOM) or the SharePoint REST API to authenticate. Also, it's important to keep in mind that the Excel files should be stored in a SharePoint library that allows anonymous access or that the user running the script has permission to read the files in the library.

<hr>


