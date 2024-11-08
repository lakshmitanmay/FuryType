<?php
date_default_timezone_set('Asia/Kolkata');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FuryType - Delete Profile</title>
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
            <li><a href="stats.php">Stats</a></li>
            <li><a href="tutorial.php">Tutorial</a></li>
            <li><a href="register_login.php">Login/Register</a></li>
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

<!-- Main Section -->
<main class="reg_log">
    <h2>Delete Profile</h2>

    <?php
    $message_success = "";
    $message_error = "";

    if (isset($_POST['submit'])) {
        $reg_un1 = $_POST['reg_un1'];
        $reg_pw1 = $_POST['reg_pw1'];

        $host = "localhost";
        $username = "root";
        $password = "";
        $dbname = "furytype";

        $con = mysqli_connect($host, $username, $password, $dbname);

        if (!$con) {
            die("Connection failed!" . mysqli_connect_error());
        }

        $stmt = $con->prepare("SELECT reg_pw1 FROM fury_reg WHERE reg_un1 = ?");
        $stmt->bind_param("s", $reg_un1);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $hashed_password = $row['reg_pw1'];

            if (password_verify($reg_pw1, $hashed_password)) {
                $delete_stmt = $con->prepare("DELETE FROM fury_reg WHERE reg_un1 = ?");
                $delete_stmt->bind_param("s", $reg_un1);

                if ($delete_stmt->execute()) {
                    $message_success = "Profile deleted successfully!";
                } else {
                    $message_error = "Error deleting record: " . $delete_stmt->error;
                }
                $delete_stmt->close();
            } else {
                $message_error = "Incorrect password!";
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

    <form class="register" action="" method="post">
        <fieldset class="reg_border">
            <legend class="reg_log_leg">Delete Profile</legend>

            <label for="reg_un1">Enter the Username</label><br>
            <input type="text" id="reg_un1" name="reg_un1" required><br><br>

            <label for="reg_pw1">Enter the Password</label><br>
            <input type="password" id="reg_pw1" name="reg_pw1" required><br><br>

            <input type="submit" name="submit" value="Submit">
        </fieldset>
    </form>

    <a href="register_login.php" class="button">Go back</a>
</main>
</body>

</html>
