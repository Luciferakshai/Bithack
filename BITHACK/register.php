<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "infoportal";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST["email"];
    $rollnumber = $_POST["rollnumber"];
    $password = $_POST["password"];
    $cpassword = $_POST["cpassword"];
    $name =$_POST["name"];
    $phone_no = $_POST["phone_no"];
    $institution = $_POST["institution"];
    $department = $_POST["department"];

    if($_POST['password'] == $_POST['cpassword']){ 
        $sql = "INSERT INTO `users`(`name`, `emailid`, `phone_no`, `password`, `institution`, `department`, `rollnumber`) VALUES ('$name','$email','$phone_no','$password','$institution','$department','$rollnumber')";

    $result = $conn->query($sql);
    header("Location: login.html");
    } else{
        header("location: register.html");
        exit;
    }

    $conn->close();
}
?>

