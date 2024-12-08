document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();  // Prevent the form from reloading the page
    
    // Get the file name and content from the form inputs
    const fileName = document.getElementById('fileName').value;
    const fileContent = document.getElementById('fileContent').value;

    // Check if both fields are filled
    if (!fileName || !fileContent) {
        document.getElementById('responseMessage').innerHTML = 'Please provide both a file name and file content.';
        return;
    }

    try {
        // Make a POST request to your Azure Function
        const response = await fetch('https://touristmediaapi.azurewebsites.net/api/upload?code=<Your-Master-Host-Key>', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileName: fileName,
                fileContent: fileContent
            })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('responseMessage').innerHTML = `Success: ${data.message}`;
        } else {
            document.getElementById('responseMessage').innerHTML = `Error: ${data.error}`;
        }
    } catch (error) {
        document.getElementById('responseMessage').innerHTML = `Error: ${error.message}`;
    }
});
