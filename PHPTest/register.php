<!DOCTYPE html>
<html lang="en">

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
            <li><a href="../index.html">Home</a></li>
            <li><a href="../HTML/profile.html">Profile</a></li>
            <li><a href="https://lakshmitanmay.github.io">About Me</a></li>
            <li><a href="../HTML/tutorial.html">Tutorial</a></li>
        </ul>
    </nav>
</header>

<?php
session_start(); // Start a session to store data between POST and GET requests

$nameErr = $emailErr = $passwordErr = "";
$name = $email = $password = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($_POST["name"])) {
        $nameErr = "Name is required";
    } else {
        $name = input_data($_POST["name"]);
        if (!preg_match("/^[a-zA-Z]*$/", $name)) {
            $nameErr = "Only alphabets are allowed";
        }
    }

    if (empty($_POST["email"])) {
        $emailErr = "Email is required";
    } else {
        $email = input_data($_POST["email"]);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $emailErr = "Invalid email format";
        }
    }

    if (empty($_POST["password"])) {
        $passwordErr = "Password is required";
    } else {
        $password = input_data($_POST["password"]);
        if (strlen($password) < 8 || !preg_match("/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/", $password)) {
            $passwordErr = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
        }
    }

    // Registration process
    if ($nameErr == "" && $emailErr == "" && $passwordErr == "") {
        $_SESSION['registered'] = true;
        $_SESSION['name'] = $name;
        $_SESSION['email'] = $email;
        $_SESSION['password'] = $password;
        echo "<h3 style='color: #FF0001'><b>You have successfully registered.</b></h3>";
        echo "<h2>Your Input:</h2>";
        echo "Name: " . htmlspecialchars($name) . "<br>";
        echo "Email: " . htmlspecialchars($email) . "<br>";
        echo "Password: " . htmlspecialchars($password) . "<br>";
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["submit"])) {
    // Login process
    $log_name = input_data($_GET["name"]);
    $log_password = input_data($_GET["password"]);

    if (isset($_SESSION['registered']) && $_SESSION['registered'] && $log_name == $_SESSION['name'] && $log_password == $_SESSION['password']) {
        echo "<h3 style='color: #55ff00'><b>You have successfully logged in.</b></h3>";
    } else {
        echo "<h3 style='color: #ff0000'><b>User doesn't exist or incorrect password</b></h3>";
    }
}

function input_data($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}
?>
<!-- Main Section -->
<main class="reg_log">
    <form name="register" class="register" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <fieldset class="reg_border">
            <p class="error">* required field</p>
            <legend class="reg_log_leg">Register</legend>
            <label><input id="reg_un1" name="name" type="text" value="<?php echo htmlspecialchars($name); ?>"
                          placeholder="* username"></label>
            <span class="error"><?php echo $nameErr; ?></span>
            <label><input id="reg_pw1" name="password" type="password" placeholder="* password"
                          value="<?php echo htmlspecialchars($password); ?>"></label>
            <span class="error"><?php echo $passwordErr; ?></span>
            <label><input id="email" name="email" type="text" placeholder="* email"
                          value="<?php echo htmlspecialchars($email); ?>"></label>
            <span class="error"><?php echo $emailErr; ?></span>
            <div>
                <input type="submit" value="register" name="submit">
            </div>
            <p class="or">or</p>
            <div class="reg_log_but">
                <a class="google_img" href="https://google.com">
                    <img src="../images/google.png" alt="Google Logo" width="55px">
                </a>
                <a href="https://github.com">
                    <img src="../images/github.png" alt="GitHub Logo" width="53px">
                </a>
            </div>
        </fieldset>
    </form>

    <form class="login" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="get">
        <fieldset class="log_border">
            <legend class="reg_log_leg">Login</legend>
            <input id="log_un1" name="name" type="text" placeholder="username" required>
            <br>
            <input id="log_pw1" name="password" type="password" placeholder="password" required>
            <div>
                <input type="submit" value="login" name="submit">
            </div>
            <p class="or">or</p>
            <div class="reg_log_but">
                <a class="google_img" href="https://google.com">
                    <img src="../images/google.png" alt="Google Logo" width="55px">
                </a>
                <a href="https://github.com">
                    <img src="../images/github.png" alt="GitHub Logo" width="53px">
                </a>
            </div>
        </fieldset>
    </form>

    <form class="return_but" action="../index.html">
        <input type="submit" value="return">
    </form>

</main>
</body>

</html>
