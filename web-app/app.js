document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way
    console.log("Form submitted");

    const formData = new FormData();
    const mediaFile = document.getElementById("mediaFile").files[0];
    const location = document.getElementById("location").value;

    console.log("mediaFile:", mediaFile);
    console.log("location:", location);

    // Check if file and location are provided
    if (!mediaFile || !location) {
        alert("Please provide both the file and the location.");
        return;
    }

    // Append data to formData
    formData.append("mediaFile", mediaFile);
    formData.append("location", location);

    try {
        const functionUrl = "https://touristmediaapi.azurewebsites.net/api/upload?";  // Replace with correct URL
        console.log("Sending request to:", functionUrl);

        const response = await fetch(functionUrl, {
            method: "POST",
            body: formData,
        });

        const result = await response.json();
        console.log("Response from Azure Function:", result);

        if (response.ok) {
            alert("File uploaded successfully.");
            fetchGallery();  // Reload gallery
        } else {
            alert("Error uploading file: " + result.message);
        }
    } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file.");
    }
});
