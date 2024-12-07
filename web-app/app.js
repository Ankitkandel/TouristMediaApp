document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('uploadForm');
    const galleryGrid = document.getElementById('galleryGrid');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const fileInput = document.getElementById('mediaFile');
        const locationInput = document.getElementById('location');

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        formData.append('location', locationInput.value);

        try {
            const response = await fetch('https://touristfunctionapi.azurewebsites.net/api/TouristAttractionMedia', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const result = await response.json();
                alert('Media uploaded successfully!');
                displayMedia(result.url, result.location);
            } else {
                alert('Error uploading media.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function displayMedia(url, location) {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'media-item';
        imgDiv.innerHTML = `
            <img src="${url}" alt="${location}" />
            <p>${location}</p>
        `;
        galleryGrid.appendChild(imgDiv);
    }
});
