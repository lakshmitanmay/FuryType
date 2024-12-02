<?php
date_default_timezone_set('Asia/Kolkata');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stats</title>
    <link rel="stylesheet" href="../CSS/common_styles.css">
    <link rel="stylesheet" href="../CSS/specific_styles.css">
    <script type="text/javascript" src="../JS/common_scripts.js"></script>
    <script type="text/javascript" src="../JS/specific_scripts.js"></script>
</head>

<body class="body">
<!-- Header Section -->
<header class="nav_bar">
    <nav class="nav_bar_left">
        <h1><a class="logo" href="">FuryType</a></h1>
        <button class="theme_switch" type="button" onclick="toggle_mode();" aria-label="Toggle dark/light theme">
            ☾ / ☼
        </button>
    </nav>

    <nav class="nav_bar_right">
        <ul>
            <li><a href="../index.php">Home</a></li>
            <li><a href="tutorial.php">Tutorial</a></li>
            <li><a href="register_login.php">Login/Register</a></li>
            <li><a href="https://oltt.carrd.co">About Me</a></li>
        </ul>
    </nav>
</header>

<!-- Main Section -->
<main>
    <h3 class="greeting">
        <?php
        $hour = date("H");
        if ($hour < 12) {
            echo "Good Morning!";
        } elseif ($hour < 18) {
            echo "Good Afternoon!";
        } else {
            echo "Good Evening!";
        }
        ?>
    </h3>

    <h2 class="main_heading">Stats</h2>

    <table class="metrics">
        <tr class="metrics_heading">
            <th>S.No.</th>
            <th>Speed (WPM)</th>
            <th>Accuracy</th>
            <th>Time</th>
        </tr>

        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "furytype";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT `id`, `speed`, `accuracy`, `time` FROM `user_stats` order by `id` desc;";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $row["id"] . "</td>";
                echo "<td>" . $row["speed"] . "</td>";
                echo "<td>" . $row["accuracy"] . "</td>";
                echo "<td>" . $row["time"] . "</td>";
                echo "</tr>";
            }
        } else {
            echo "<tr><td colspan='4'>No stats available.</td></tr>";
        }

        $conn->close();
        ?>
    </table>
</main>

<div class="button_container">
    <a href="../index.php" class="button">Return</a>
</div>
</body>

</html>