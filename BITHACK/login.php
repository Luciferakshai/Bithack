<?php
session_start(); 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "infoportal";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $emailid = $_POST["emailid"];
    $password = $_POST["password"];

    $sql = "SELECT * FROM users WHERE emailid = '$emailid' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $name = $row['name'];
        $username = $row['username'];

        $_SESSION["name"] = $name;
        $_SESSION["username"] = $username;

        header("Location: home.html"); 
        exit;
    } else {
        header("Location: login.html");
        exit;
    }
}

$conn->close();
?>