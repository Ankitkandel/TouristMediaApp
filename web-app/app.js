document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way

    const formData = new FormData();
    const mediaFile = document.getElementById("mediaFile").files[0];
    const location = document.getElementById("location").value;

    // Check if file and location are provided
    if (!mediaFile || !location) {
        alert("Please provide both the file and the location.");
        return;
    }

    // Append data to formData
    formData.append("mediaFile", mediaFile);
    formData.append("location", location);

    try {
        // Replace with your Azure Function URL
        const functionUrl = "https://<your-function-app-name>.azurewebsites.net/api/TouristAttractionMedia";  // Replace with correct URL

        // Send POST request to Azure Function
        const response = await fetch(functionUrl, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            // Success
            alert("File uploaded successfully.");
            console.log(result.message);
            fetchGallery();  // Reload gallery
        } else {
            // Error
            alert("Error uploading file: " + result.message);
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file.");
    }
});

// Function to fetch gallery (to display uploaded images)
async function fetchGallery() {
    try {
        const functionUrl = "https://<your-function-app-name>.azurewebsites.net/api/TouristAttractionMedia";  // Replace with correct URL
        const response = await fetch(functionUrl);
        const data = await response.json();

        if (response.ok) {
            const galleryGrid = document.getElementById("galleryGrid");
            galleryGrid.innerHTML = "";  // Clear previous gallery items

            data.forEach((blob) => {
                const imgElement = document.createElement("img");
                imgElement.src = blob.url;
                imgElement.alt = blob.name;
                imgElement.style.width = "100%";
                galleryGrid.appendChild(imgElement);
            });
        } else {
            alert("Error fetching gallery");
        }
    } catch (error) {
        console.error("Error fetching gallery:", error);
    }
}

// Load gallery when the page is loaded
window.onload = fetchGallery;
