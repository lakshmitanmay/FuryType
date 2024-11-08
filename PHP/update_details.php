<?php
date_default_timezone_set('Asia/Kolkata');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Accounts Details</title>
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

<main class="reg_log">
    <h2>Update Stats Details</h2>

    <?php
    $message_success = "";
    $message_error = "";

    if (isset($_POST['submit'])) {
        $reg_un1 = trim($_POST['reg_un1']);
        $reg_pw1 = $_POST['reg_pw1'];
        $reg_un2 = trim($_POST['reg_un2']);
        $reg_pw2 = $_POST['reg_pw2'];
        $reg_pw3 = $_POST['reg_pw3'];
        $email = trim($_POST['email']);

        if ($reg_pw2 !== $reg_pw3) {
            $message_error = "New passwords do not match!";
        } else {
            $host = "localhost";
            $username = "root";
            $password = "";
            $dbname = "furytype";

            $con = mysqli_connect($host, $username, $password, $dbname);

            if (!$con) {
                die("Connection failed!" . mysqli_connect_error());
            }

            // Check if the new username already exists in the database
            $check_stmt = $con->prepare("SELECT reg_un1 FROM fury_reg WHERE reg_un1 = ? AND reg_un1 != ?");
            $check_stmt->bind_param("ss", $reg_un2, $reg_un1);
            $check_stmt->execute();
            $check_result = $check_stmt->get_result();

            if ($check_result->num_rows > 0) {
                $message_error = "The new username is already taken. Please choose a different one.";
            } else {
                // Proceed if no conflict with the new username
                $stmt = $con->prepare("SELECT reg_pw1 FROM fury_reg WHERE reg_un1 = ?");
                $stmt->bind_param("s", $reg_un1);
                $stmt->execute();
                $result = $stmt->get_result();

                if ($result->num_rows === 1) {
                    $row = $result->fetch_assoc();
                    $hashed_password = $row['reg_pw1'];

                    if (password_verify($reg_pw1, $hashed_password)) {
                        $new_hashed_password = password_hash($reg_pw2, PASSWORD_DEFAULT);

                        $update_stmt = $con->prepare("UPDATE fury_reg SET reg_un1 = ?, email = ?, reg_pw1 = ? WHERE reg_un1 = ?");
                        $update_stmt->bind_param("ssss", $reg_un2, $email, $new_hashed_password, $reg_un1);

                        if ($update_stmt->execute()) {
                            $message_success = "Record updated successfully!";
                        } else {
                            $message_error = "Error updating record: " . $update_stmt->error;
                        }

                        $update_stmt->close();
                    } else {
                        $message_error = "Current password is incorrect!";
                    }
                } else {
                    $message_error = "User not found!";
                }

                $stmt->close();
            }

            $check_stmt->close();
            mysqli_close($con);
        }
    }
    ?>

    <?php if (!empty($message_success)): ?>
        <p class="message message_success"><?php echo $message_success; ?></p>
    <?php endif; ?>

    <?php if (!empty($message_error)): ?>
        <p class="message message_error"><?php echo $message_error; ?></p>
    <?php endif; ?>

    <form action="" method="post" class="register">
        <fieldset class="reg_border">
            <legend class="reg_log_leg">Update Profile Details</legend>

            <label for="reg_un1">Enter current username</label><br>
            <input type="text" id="reg_un1" name="reg_un1" required><br><br>

            <label for="reg_pw1">Enter current password</label><br>
            <input type="password" id="reg_pw1" name="reg_pw1" required><br><br>

            <label for="reg_un2">New username</label><br>
            <input type="text" id="reg_un2" name="reg_un2" required minlength="4" maxlength="20"
                   pattern="[a-zA-Z0-9_]+"
                   title="Username must be 4-20 characters and can include letters, numbers, and underscores only."><br><br>

            <label for="reg_pw2">New password</label><br>
            <input type="password" id="reg_pw2" name="reg_pw2"
                   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                   title="Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
                   required maxlength="255"><br><br>

            <label for="reg_pw3">Confirm new password</label><br>
            <input type="password" id="reg_pw3" name="reg_pw3" required><br><br>

            <label for="email">New email</label><br>
            <input type="email" id="email" name="email" required maxlength="255"><br><br>

            <input type="submit" name="submit" value="Submit">
        </fieldset>
    </form>

    <a href="register_login.php" class="button">Go back</a>
</main>
</body>

</html>
