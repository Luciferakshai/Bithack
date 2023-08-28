<?php

include 'connection.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = $_POST["email"];
    $rollnumber = $_POST["rollnumber"];
    $password = $_POST["password"];
    $cpassword = $_POST["cpassword"];
    $name =$_POST["name"];
    $mobile_no = $_POST["mobile_no"];
    $institution = $_POST["institution"];
    $department = $_POST["department"];
    
    $sql1="SELECT * FROM users WHERE username = '$username' ";
    $result1 = $conn->query($sql1);

if($result1->num_rows == 0){
    if($_POST['password'] == $_POST['cpassword']){ 
        $sql = "INSERT INTO `users`(`name`, `emailid`, `mobile_no.`, `password`, `city`, `state`, `username`) VALUES ('$name','$email','$mobile_no','$password','$city','$state','$username')";
        $sql2 = "CREATE TABLE `$username` (
            `s.no` INT AUTO_INCREMENT PRIMARY KEY,
            `transaction` VARCHAR(50),
            `date` DATE,
            `type` VARCHAR(50),
            `description` VARCHAR(255),
            `amount` INT(255)
        )";
        
        
    $result2 = $conn->query($sql2);
    $result = $conn->query($sql);
    header("Location: login.html");
    } else{
        header("location: register.html");
        exit;
    }
} else{
    header("location: register.html");
}
    $conn->close();
}
?>

