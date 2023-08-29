<?php
include 'connection.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$eventname = $_GET['event'];
$currentDate = date('Y-m-d');
$sql = "SELECT * FROM events WHERE event_type='$eventname' AND end_date >= '$currentDate' ORDER BY start_date ASC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $name = $row['name'];
        $start_date = $row['start_date'];
        $end_date = $row['end_date'];
        $venue = $row['venue'];
        
        echo 
        "<div class='card'>
          <div class='card-content'>
            <h2>". $name ."</h2>
            <p>Date: ". $start_date ." to ". $end_date ."</p>
            <p>Location: ". $venue ."</p>
            <a href='#' class='btn'>Learn More</a>
          </div>
        </div>";
    }
} else {
    echo "<h3>No upcomming events found in ". $eventname ."</h3>";
}

$conn->close();
?>
