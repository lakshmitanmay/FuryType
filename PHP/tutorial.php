<?php
date_default_timezone_set('Asia/Kolkata');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tutorial</title>
    <link rel="stylesheet" href="../CSS/common_styles.css">
    <link rel="stylesheet" href="../CSS/specific_styles.css">
    <script type="text/javascript" src="../JS/common_scripts.js"></script>
    <script type="text/javascript" src="../JS/specific_scripts.js"></script>
</head>

<body class="body">
<!-- Header Section -->
<header class="nav_bar">
    <nav class="nav_bar_left">
        <h1><a class="logo" href="../index.php">FuryType</a></h1>
        <button class="theme_switch" type="button" onclick="toggle_mode();" aria-label="Toggle dark/light theme">
            ☾ / ☼
        </button>
    </nav>


    <nav class="nav_bar_right">
        <ul>
            <li><a href="../index.php">Home</a></li>
            <li><a href="../PHP/stats.php">Stats</a></li>
            <li><a href="../PHP/register_login.php">Login/Register</a></li>
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
    <h2 class="main_heading">Tutorial</h2>
    <iframe class="steps_frame" src="master_typing.php" title="master_typing"></iframe>
    <iframe class="youtube_video" src="https://www.youtube.com/embed/QAb3ATOpBpE?si=EKZ6IpJN8akG44gd"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</main>

<div class="button_container">
    <a href="../index.php" class="button">Return</a>
</div>
</body>

</html>