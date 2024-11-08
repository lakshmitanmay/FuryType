<?php
date_default_timezone_set('Asia/Kolkata');
?>
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
            <li><a href="stats.php">Stats</a></li>
            <li><a href="tutorial.php">Tutorial</a></li>
            <li><a href="https://oltt.carrd.co">About Me</a></li>
        </ul>
    </nav>
</header>

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

<main class="reg_log">
    <?php
    $message_success = "";
    $message_error = "";

    function connectDatabase()
    {
        $host = "localhost";
        $username = "root";
        $password = "";
        $dbname = "furytype";
        $con = mysqli_connect($host, $username, $password, $dbname);
        if (!$con) {
            die("Connection failed: " . mysqli_connect_error());
        }
        return $con;
    }

    if (isset($_POST['register'])) {
        $reg_un1 = trim($_POST['reg_un1']);
        $email = trim($_POST['email']);
        $reg_pw1 = $_POST['reg_pw1'];
        $hashed_password = password_hash($reg_pw1, PASSWORD_DEFAULT);

        $con = connectDatabase();

        $stmt = $con->prepare("SELECT * FROM fury_reg WHERE reg_un1 = ? OR email = ?");
        $stmt->bind_param("ss", $reg_un1, $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $message_error = "Username or email already exists!";
        } else {
            $stmt = $con->prepare("INSERT INTO fury_reg (reg_un1, email, reg_pw1) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $reg_un1, $email, $hashed_password);

            if ($stmt->execute()) {
                $message_success = "Successfully Registered";
            } else {
                $message_error = "Error registering! " . $stmt->error;
            }
        }

        $stmt->close();
        mysqli_close($con);
    }

    if (isset($_POST['login'])) {
        $log_un1 = trim($_POST['username']);
        $log_pw1 = $_POST['password'];

        $con = connectDatabase();

        $stmt = $con->prepare("SELECT reg_pw1 FROM fury_reg WHERE reg_un1 = ?");
        $stmt->bind_param("s", $log_un1);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $hashed_password = $row['reg_pw1'];

            if (password_verify($log_pw1, $hashed_password)) {
                $message_success = "Login successful!";
            } else {
                $message_error = "Invalid password!";
            }
        } else {
            $message_error = "User not found!";
        }

        $stmt->close();
        mysqli_close($con);
    }
    ?>

    <?php if (!empty($message_success)): ?>
        <p class="message message_success"><?php echo $message_success; ?></p>
    <?php endif; ?>

    <?php if (!empty($message_error)): ?>
        <p class="message message_error"><?php echo $message_error; ?></p>
    <?php endif; ?>

    <form name="register" class="register" action="register_login.php" method="post">
        <fieldset class="reg_border">
            <legend class="reg_log_leg">Register</legend>
            <input id="reg_un1" name="reg_un1" type="text" placeholder="username" required minlength="4"
                   maxlength="20" pattern="[a-zA-Z0-9_]+"
                   title="Username must be 4-20 characters and can include letters, numbers, and underscores only.">
            <input id="email" name="email" type="email" placeholder="email" required maxlength="255">
            <input id="reg_pw1" name="reg_pw1" type="password" placeholder="password"
                   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                   title="Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
                   required maxlength="255">
            <div>
                <input type="submit" name="register" value="Register">
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

    <form class="login" name="login" action="register_login.php" method="post">
        <fieldset class="log_border">
            <legend class="reg_log_leg">Login</legend>
            <input id="log_un1" name="username" type="text" placeholder="username" required>
            <br>
            <input id="log_pw1" name="password" type="password" placeholder="password" required>
            <div>
                <input type="submit" name="login" value="Login">
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

    <br><br><br>
    <div class="button_container">
        <a href="../index.php" class="button">Return</a>
        <a href="update_details.php" class="button">Update Account Details</a>
        <a href="delete_account.php" class="button">Delete Account</a>
    </div>

</main>
</body>
</html>
