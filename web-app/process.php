
<?php
// Database Connection
$serverName = "imagedatabase.database.windows.net";
$connectionOptions = array(
    "Database" => "imagedatabase", 
    "Uid" => "kandel", 
    "PWD" => "root@123"
);
$conn = sqlsrv_connect( $serverName, $connectionOptions);

// Check connection
if ($conn === false) {
    die(print_r(sqlsrv_errors(), true));
}

// Handle image insertion
if (isset($_POST['upload'])) {
    $imageName = $_POST['imageName'];
    $imageData = file_get_contents($_FILES['image']['tmp_name']);
    $contentType = $_FILES['image']['type'];
    $uploadDate = date("Y-m-d H:i:s");

    // Insert image into the database
    $sql = "INSERT INTO Images (ImageName, ImageData, ContentType, UploadDate) VALUES (?, ?, ?, ?)";
    $params = array($imageName, $imageData, $contentType, $uploadDate);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }
}

// Handle image deletion
if (isset($_GET['delete_id'])) {
    $imageID = $_GET['delete_id'];

    // Delete image from the database
    $sql = "DELETE FROM Images WHERE ImageID = ?";
    $params = array($imageID);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }
}

// Handle image update
if (isset($_POST['update'])) {
    $imageID = $_POST['imageID'];
    $imageName = $_POST['imageName'];
    $uploadDate = date("Y-m-d H:i:s");

    // Update image data in the database
    $sql = "UPDATE Images SET ImageName = ?, UploadDate = ? WHERE ImageID = ?";
    $params = array($imageName, $uploadDate, $imageID);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt === false) {
        die(print_r(sqlsrv_errors(), true));
    }
}

// Query to select all images from the database
$sql = "SELECT ImageID, ImageName, ImageData, ContentType, UploadDate FROM Images";
$stmt = sqlsrv_query($conn, $sql);

// Display images in a table
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    echo "<tr>
            <td>" . $row['ImageName'] . "</td>
            <td><img src='data:" . $row['ContentType'] . ";base64," . base64_encode($row['ImageData']) . "' alt='" . $row['ImageName'] . "' width='100'></td>
            <td>" . $row['UploadDate']->format('Y-m-d H:i:s') . "</td>
            <td>
                <form action='process.php' method='POST'>
                    <input type='hidden' name='imageID' value='" . $row['ImageID'] . "'>
                    <input type='text' name='imageName' value='" . $row['ImageName'] . "' required>
                    <input type='submit' name='update' value='Update'>
                </form>
            </td>
            <td>
                <a href='process.php?delete_id=" . $row['ImageID'] . "'>Delete</a>
            </td>
          </tr>";
}

// Close the database connection
sqlsrv_close($conn);
?>
