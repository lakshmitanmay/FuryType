<!DOCTYPE html>
<html lang="en">
<?php
date_default_timezone_set('Asia/Kolkata'); // Replace with your timezone
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FuryType</title>
    <link rel="stylesheet" href="../CSS/common_styles.css">
    <link rel="stylesheet" href="../CSS/specific_styles.css">
    <script type="text/javascript" src="../JS/common_scripts.js"></script>
    <script type="text/javascript" src="../JS/specific_scripts.js"></script>

</head>

<body class="body">

<!-- Header Section -->
<header class="nav_bar">
    <nav class="nav_bar_left">
        <h1><a class="logo" href="../index.html">FuryType</a></h1>
        <button class="theme_switch" type="button" onclick="toggle_mode();" aria-label="Toggle dark/light theme">
            ☾ / ☼
        </button>
    </nav>

    <nav class="nav_bar_right">
        <ul>
            <li><a href="https://lakshmitanmay.github.io">About Me</a></li>
            <li><a href="../HTML/profile.html" onmouseover="mouseoverevent(this)" onmouseleave="mouseleaveevent(this)"
                   data-preview="profile_img">Profile</a>
            </li>
            <li><a href="../HTML/tutorial.html" onmouseover="mouseoverevent(this)" onmouseleave="mouseleaveevent(this)"
                   data-preview="tutorial_img">Tutorial</a></li>
            <li><a href="../HTML/register.html" onmouseover="mouseoverevent(this)" onmouseleave="mouseleaveevent(this)"
                   data-preview="login_img">Login/Register</a></li>
        </ul>
        <img id="profile_img" src="../images/profile.jpeg" alt="preview of profile page">
        <img id="tutorial_img" src="../images/tutorial.jpeg" alt="preview of tutorial page">
        <img id="login_img" src="../images/login.jpeg" alt="preview of login page">
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
    <?php
    $verbs = ["Test", "Improve", "Boost", "Enhance", "Challenge"];
    $adjectives = ["Your Speed", "Your Typing Skills", "Your Accuracy", "Your Focus"];
    $nouns = ["Now!", "Today!", "Right Away!", "Instantly!", "With Fury!"];

    $final_heading = "";

    $heading_parts = [$verbs, $adjectives, $nouns];

    foreach ($heading_parts as $part) {
        $final_heading .= $part[array_rand($part)] . " ";
    }
    ?>
    <h2 class="main_heading"><?php echo trim($final_heading); ?></h2>
    <form class="type_test">
        <label>
            <input class="input_box" type="text" placeholder="Start Typing Text Here" required>
        </label>
    </form>
</main>
</body>

</html>