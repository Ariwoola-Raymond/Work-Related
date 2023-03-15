// Define the user ID or email address of the user whose photo you want to retrieve
const userId = "john.doe@contoso.com";

// Construct the URL to the user's photo
const photoUrl = `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`;

// Get the SharePoint context
const context = SP.ClientContext.get_current();
const web = context.get_web();
const appContextSite = new SP.AppContextSite(context, 'https://your-sharepoint-site-url');

// Create a new instance of the request executor
const executor = new SP.RequestExecutor(appContextSite.get_url());

// Define the callback function for when the access token is retrieved
const onAccessTokenSuccess = (accessToken) => {
    // Set the authorization header with the access token
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };

    // Make a GET request to the photo URL to retrieve the photo
    executor.executeAsync({
        url: photoUrl,
        method: "GET",
        headers: headers,
        success: (data) => {
            // Display the photo on the page
            const photoElement = document.createElement("img");
            photoElement.src = URL.createObjectURL(data.body);
            document.body.appendChild(photoElement);
        },
        error: (error) => {
            console.error(error);
        }
    });
};

// Define the callback function for when the access token cannot be retrieved
const onAccessTokenError = (error) => {
    console.error(error);
};

// Get the access token using the SharePoint context
const accessToken = await SP.RequestExecutorUtilities.getAccessToken(context, appContextSite.get_url(), onAccessTokenSuccess, onAccessTokenError);




//////////////////////////////////////////////////////////////////// //////////////////// //////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// ///////////////////
//////////////////////////////////////////////////////////////////// //////////////////// //////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// ///////////////////
//////////////////////////////////////////////////////////////////// //////////////////// //////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// ///////////////////
//////////////////////////////////////////////////////////////////// //////////////////// //////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// ///////////////////
//////////////////////////////////////////////////////////////////// //////////////////// //////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// ///////////////////
//////////////////////////////////////////////////////////////////// //////////////////// //////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// ///////////////////
//////////////////////////////////////////////////////////////////// //////////////////// //////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// /////////////////// ///////////////////

// Define the user ID or email address of the user whose photo you want to retrieve
const userId = "john.doe@contoso.com";

// Construct the URL to the user's photo
const photoUrl = `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`;

// Get the access token using the SharePoint context
const getAccessToken = (callback) => {
    // Get the SharePoint context
    const context = SP.ClientContext.get_current();
    const web = context.get_web();
    const appContextSite = new SP.AppContextSite(context, 'https://your-sharepoint-site-url');
    
    // Get the access token using the SharePoint context
    SP.RequestExecutorUtilities.getAccessToken(context, appContextSite.get_web().get_url(), (accessToken) => {
        callback(accessToken);
    });
};

// Retrieve the user's photo using the access token
const getPhoto = (accessToken) => {
    // Set the authorization header with the access token
    const headers = {
        Authorization: `Bearer ${accessToken}`
    };
    
    // Retrieve the user's photo using jQuery
    $.ajax({
        url: photoUrl,
        headers: headers,
        success: (data) => {
            // Display the photo on the page
            const photoElement = $("<img>").attr("src", URL.createObjectURL(data));
            $("body").append(photoElement);
        },
        error: (error) => {
            console.error(error);
        }
    });
};

// Call the functions to retrieve the access token and user's photo
getAccessToken((accessToken) => {
    getPhoto(accessToken);
});
