<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>We Own It 2025</title>
    <!-- Tailwind CSS -->
    <script
        src="https://workplace.emiratesnbd.com/sites/GCE/public/SiteAssets/javascript/third-party/tailwinds3.4.16.js"></script>

    <!-- GLightbox CSS -->
    <link rel="stylesheet"
        href="https://workplace.emiratesnbd.com/sites/GCE/public/SiteAssets/css/third-party/glightbox.min.css" />


    <style>
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: #f9fafb;
        }

        #gallery {
            padding-bottom: 10rem;
        }

        div#loader {
            margin-top: -7rem;
        }

        /* Greyscale effect for selected images */
        .group.selected img {
            filter: grayscale(1) brightness(0.85);
            transition: filter 0.2s;
        }
    </style>
</head>


<body class="min-h-screen p-6">
    <!-- required: SharePoint FormDigest -->
    <form runat="server">
        <SharePoint:FormDigest runat="server"></SharePoint:FormDigest>
    </form>


    <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800">We Own It - Event Media Gallery</h1>
        <p class="text-gray-500 mt-2">Scroll to load more photos</p>
    </div>

    <!-- Gallery Grid -->
    <form id="printForm">
        <div id="gallery" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"></div>
    </form>
    <div id="loader" class="text-center my-4 hidden">Loading...</div>

    <!-- Fixed Submit Button -->
    <div id="fixedBar" class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 z-50 shadow-lg hidden">
        <div id="fixedBarInner" class="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
            <div class="flex flex-col items-center sm:items-start" id="selectionCountWarning">
                <div id="selectionCount" class="text-blue-700 font-semibold">
                    0 out of 3 selected
                </div>
                <div id="selectionWarning" class="text-red-600 font-semibold hidden text-sm mt-1">
                    You can select up to 3 images only.
                </div>
            </div>
            <button id="submitBtn" form="printForm" type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition w-full sm:w-auto">
                Submit Selected for Print
            </button>
        </div>
    </div>


    <!-- Modal -->
    <div id="addressModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 class="text-xl font-bold mb-4 text-gray-800"> Delivery Details</h2>
            <p class="text-sm text-gray-600 mb-4">Please enter your branch name and location so we know where to send
                your
                photos.</p>

            <label class="block mb-3">
                <span class="text-gray-700 text-sm">Branch Name</span>
                <input type="text" id="branchName"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    placeholder="e.g. Dubai Mall Branch" />
            </label>

            <label class="block mb-4">
                <span class="text-gray-700 text-sm">Branch Location</span>
                <input type="text" id="branchLocation"
                    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    placeholder="e.g. Downtown Dubai" />
            </label>

            <div class="flex justify-end gap-3">
                <button onclick="closeModal()" id="cancelDetailsbtn"
                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
                <button onclick="submitDetails()" id="submitDetailsbtn"
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            </div>
        </div>
    </div>

    <!-- GLightbox & Plyr Scripts -->
    <script src="https://workplace.emiratesnbd.com/sites/GCE/public/SiteAssets/javascript/third-party/glightbox.min.js"></script>

    <script>
        const userSPDPname = _spPageContextInfo.userDisplayName;
        const userSPID = _spPageContextInfo.userId;
        const MAX_SELECTION = 3;
        const SP_SITE_URL = 'https://workplace.emiratesnbd.com/sites/GCE/public';
        const LIBRARY_PATH = 'weownitgallery/';
        const PAGE_SIZE = 100;
        let nextPageUrl = `${SP_SITE_URL}/_api/web/GetFolderByServerRelativeUrl('${encodeURIComponent(LIBRARY_PATH)}')/Files?$select=Name,ServerRelativeUrl&$top=${PAGE_SIZE}`;
        const headers = { 'Accept': 'application/json;odata=nometadata' };
        let isLoading = false;
        let selectedImages = "";


        const gallery = document.getElementById('gallery');
        const selectionCountWarning = document.getElementById('selectionCountWarning');
        const selectionWarning = document.getElementById('selectionWarning');
        const selectionCount = document.getElementById('selectionCount');
        const fixedBar = document.getElementById('fixedBar');
        const fixedBarInner = document.getElementById('fixedBarInner');
        const submitBtn = document.getElementById('submitBtn');
        const submitDetailsbtn = document.getElementById('submitDetailsbtn');
        const closeModalbtn = document.getElementById('cancelDetailsbtn');
        // const LOCAL_STORAGE_KEY = 'woi_gallery_submitted';

        // Check if user already submitted
        // const alreadySubmitted = localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
        let alreadySubmitted = false;

        checkIfSPUIDExists(userSPID)
            .then(exists => {
                if (exists) {
                    // True
                    alreadySubmitted = exists
                } else {
                    // False
                    console.log("Does not exist");
                    alreadySubmitted = exists;
                    fixedBar.classList.remove('hidden');
                }
            });

            
        function checkIfSPUIDExists(spuidValue) {
            const listName = "weownitImagetracker";
            const siteUrl = _spPageContextInfo.webAbsoluteUrl; // Get the current site URL
            const endpoint = `${siteUrl}/_api/web/lists/getByTitle('${listName}')/items?$filter=SPUID eq ${spuidValue}`;

            return fetch(endpoint, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-Type': 'application/json;odata=nometadata'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.value && data.value.length > 0) {
                        console.log(`Column "SPUID" contains the value ${spuidValue} in list "${listName}".`);
                        return true; // SPUID exists
                    } else {
                        console.log(`Column "SPUID" does NOT contain the value ${spuidValue} in list "${listName}".`);
                        return false; // SPUID does not exist
                    }
                })
                .catch(error => {
                    console.error("Error checking SPUID:", error);
                    return false; // Return false in case of an error
                });
        }




        function renderCard(file) {
            const fullUrl = file.ServerRelativeUrl;
            const name = file.Name;
            const card = document.createElement('div');
            card.className = 'relative group transition';
            card.innerHTML = `
        <label class="block cursor-pointer">
          <input type="checkbox" name="selectedImages" value="${name}" class="image-checkbox absolute top-2 left-2 z-10 w-5 h-5 accent-blue-600 rounded border-gray-300 shadow focus:ring-2 focus:ring-blue-500" ${alreadySubmitted ? 'style="display:none"' : ''}/>
          <span class="absolute top-2 left-8 bg-white px-2 py-1 rounded text-xs shadow text-gray-700 opacity-80">${name}</span>
          <a href="${fullUrl}" class="glightbox" data-gallery="media">
            <img src="${fullUrl}" loading="lazy"
                 class="w-full h-48 object-cover rounded-lg shadow-md mt-6 transition" alt="${name}" />
          </a>
          <a href="${fullUrl}" download
             class="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </a>
          <span class="checkmark absolute top-2 left-2 z-20 hidden pointer-events-none">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </span>
        </label>
      `;
            gallery.appendChild(card);
        }

        // Re-init lightbox
        GLightbox({ selector: '.glightbox' });

        function updateSelectionUI() {
            const checkboxes = document.querySelectorAll('.image-checkbox');
            const checked = document.querySelectorAll('.image-checkbox:checked');
            const atLimit = checked.length >= MAX_SELECTION;

            // Update selection count text
            selectionCount.textContent = `${checked.length} out of ${MAX_SELECTION} selected`;

            checkboxes.forEach(cb => {
                const card = cb.closest('.group');
                const checkmark = card.querySelector('.checkmark');
                const img = card.querySelector('img');
                if (cb.checked) {
                    card.classList.add('ring', 'ring-blue-500', 'ring-2', 'selected');
                    checkmark.classList.remove('hidden');
                } else {
                    card.classList.remove('ring', 'ring-blue-500', 'ring-2', 'selected');
                    checkmark.classList.add('hidden');
                }
                // Disable unchecked checkboxes if at limit
                if (!cb.checked) {
                    cb.disabled = atLimit;
                    cb.classList.toggle('opacity-50', atLimit);
                    cb.classList.toggle('cursor-not-allowed', atLimit);
                } else {
                    cb.disabled = false;
                    cb.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            });

            // Show/hide warning
            if (atLimit) {
                selectionWarning.classList.remove('hidden');
            } else {
                selectionWarning.classList.add('hidden');
            }
        }

        if (!alreadySubmitted) {
            gallery.addEventListener('change', function (e) {
                if (e.target && e.target.matches('input[type="checkbox"].image-checkbox')) {
                    updateSelectionUI();
                }
            });


            async function loadNextBatch() {
                if (!nextPageUrl || isLoading) return;
                isLoading = true;
                loader.classList.remove('hidden');
                try {
                    const res = await fetch(nextPageUrl, { headers });
                    const data = await res.json();
                    const files = data.value.filter(file => /\.(jpe?g|png|webp)$/i.test(file.Name));
                    files.forEach(file => renderCard(file));
                    nextPageUrl = data['@odata.nextLink'] || null;
                    GLightbox({ selector: '.glightbox' });
                    updateSelectionUI();
                } catch (err) {
                    console.error('Error loading images:', err);
                } finally {
                    isLoading = false;
                    loader.classList.add('hidden');
                }
            }

            window.addEventListener('scroll', () => {
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
                    loadNextBatch();
                }
            });

            document.addEventListener('DOMContentLoaded', () => { loadNextBatch(); });


            function openModal() {
                document.getElementById('addressModal').classList.remove('hidden');
            }

            function closeModal() {
                document.getElementById('addressModal').classList.add('hidden');
            }


            // Initial UI update (in case of pre-checked)
            updateSelectionUI();

            // Handle form submission
            document.getElementById('printForm').addEventListener('submit', function (e) {
                e.preventDefault();
                const selected = Array.from(document.querySelectorAll('input[name="selectedImages"]:checked'))
                    .map(cb => cb.value);
                if (selected.length === 0) {
                    alert('Please select at least one image.');
                    return;
                }
                if (selected.length > MAX_SELECTION) {
                    alert('You can select up to 3 images only.');
                    return;
                }

                selectedImages = selected;

                // Open modal so user can enter address details
                openModal();
            });
        } else {
            // Hide selection UI and submit button if already submitted
            if (fixedBar) fixedBar.style.display = 'none';
            // Hide checkboxes
            document.querySelectorAll('.image-checkbox').forEach(cb => cb.style.display = 'none');
        }


        function submitDetails() {

            const branchName = document.getElementById('branchName').value.trim();
            const branchLocation = document.getElementById('branchLocation').value.trim();

            if (!branchName || !branchLocation) {
                alert('Please enter both Branch Name and Branch Location.');
                return;
            }

            const userlocation = `${branchName} --- ${branchLocation}`;


            // Disable button and reload after a short delay
            submitBtn.disabled = true;
            submitDetailsbtn.disabled = true;
            closeModalbtn.style.display = 'none';
            submitDetailsbtn.textContent = "Submitted!";

            //upload to sharepoint
            saveToSharePoint(selectedImages, userlocation);

        }



        async function saveToSharePoint(images_selected, address) {
            const siteUrl = "https://workplace.emiratesnbd.com/sites/GCE/public";
            const listName = "weownitImagetracker";

            console.log('Selected images for print:', `${images_selected}`);
            console.log('User Location:', `${address}`);

            const payload = {
                __metadata: { type: "SP.Data.WeownitImagetrackerListItem" },
                Title: userSPDPname,
                SPUID: userSPID,
                images_selected: images_selected.join(","),  // comma-separated string
                address: address
            };


            const response = await fetch(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`, {
                method: "POST",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose",
                    "X-RequestDigest": document.getElementById("__REQUESTDIGEST").value
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log("✅ Data saved successfully to SharePoint!");
                // window.location.reload();
                console.log("reloaded");

            } else {
                const error = await response.text();
                console.error("❌ Failed to save data:", error);
            }
        }

    </script>
</body>

</html>
