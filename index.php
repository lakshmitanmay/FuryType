<?php
date_default_timezone_set('Asia/Kolkata');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "furytype";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$paragraphs = [
    "You just couldn't let me go, could you? This is what happens
    when an unstoppable force meets an immovable object. You are
    truly incorruptible, aren't you? Huh? You won't kill me out of
    some misplaced sense of self-righteousness. And I won't kill you
    because you're just too much fun. I think you and I are destined
    to do this forever.",

    "To an outsider's ear it sounds absurdly wild and ridiculous to
    speak of the vocation of a thief. However, I venture to assure
    you that this vocation is a reality.",

    "I say I live in Rosemead, really, I'm at the Ramada. It doesn't
    really matter, doesn't really, really matter.",

    "Do you hear the people sing? Singing the song of angry men. It
    is the music of the people who will not be slaves again! When
    the beating of your heart echoes the beating of the drums, there
    is a life about to start when tomorrow comes!",

    "And it says to you love when you can, cry when you have to, be
    who you must. That's a part of the plan. Await your arrival with
    simple survival and one day we'll all understand."
];

$selectedParagraph = $paragraphs[array_rand($paragraphs)];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['time_elapsed']) && isset($data['wpm']) && isset($data['accuracy'])) {
        $time_elapsed = intval($data['time_elapsed']);
        $wpm = intval($data['wpm']);
        $accuracy = intval($data['accuracy']);

        $stmt = $conn->prepare("INSERT INTO user_stats (`speed`, `accuracy`, `time`) VALUES (?, ?, ?)");
        $stmt->bind_param("iii", $wpm, $accuracy, $time_elapsed);

        if ($stmt->execute()) {
            echo "Metrics saved successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Invalid data received.";
    }
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FuryType</title>
    <link rel="stylesheet" href="CSS/common_styles.css">
    <link rel="stylesheet" href="CSS/specific_styles.css">
    <script type="text/javascript" src="JS/common_scripts.js"></script>
    <script type="text/javascript" src="JS/specific_scripts.js"></script>
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
            <li><a href="PHP/stats.php">Stats</a></li>
            <li><a href="PHP/tutorial.php">Tutorial</a></li>
            <li><a href="PHP/register_login.php">Login/Register</a></li>
            <li><a href="https://oltt.carrd.co" target="_blank">About Me</a></li>
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

    <div class="paragraph dark-mode-paragraph">
        <p id="testParagraph"><?php echo $selectedParagraph; ?></p>
    </div>

    <form class="type_test" onsubmit="return false;">
        <label>
            <input class="input_box" type="text" id="typingInput" placeholder="Start Typing Text Here" required
                   oninput="calculateMetrics()" autocomplete="off" autofocus>
        </label>
    </form>

    <div class="typing_metrics dark-mode-metrics" id="metricsDisplay">
        <span id="timeElapsed">Time: 0 s</span>
        <span id="wpm">Speed: 0 WPM</span>
        <span id="accuracy">Accuracy: 0%</span>
    </div>
</main>
</body>

</html>
