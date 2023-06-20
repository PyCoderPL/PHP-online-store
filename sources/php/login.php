<?php
    session_start();
    if(!isset($_POST['login']) || !isset($_POST['pass'])) {
        header('Location: ../../index.php');
        exit();
    }

    require_once "connect.php";
    mysqli_report(MYSQLI_REPORT_OFF);

    $connection = @new mysqli($host, $db_user, $db_pass, $db_name, $db_port);

    if ($connection->connect_errno != 0) {
        echo "<b>Error number: </b>".$connection->connect_errno;
        echo "</br>";  
        echo "<b>ONLY FOR DEVELOPER. Description of the last connection error: </b>".$connection->connect_error;
    } else {
        $login = $_POST['login'];
        $login = htmlentities($login, ENT_QUOTES, "UTF-8");
        $login = mysqli_real_escape_string($connection, $login);
        $password = $_POST['pass'];

        $sql = sprintf("SELECT * FROM users WHERE user ='%s'", $login);
        if ($result = @$connection->query($sql)) {
            $user_count = $result->num_rows;
            if ($user_count == 1) {
                $table_row = $result->fetch_assoc();
                if (password_verify($password, $table_row['pass'])) {
                    unset($_SESSION['error']);
                    $_SESSION['logged'] = true;
                    $_SESSION['login'] = $login;
                    $result->free_result();
                    header('Location:  ../../pages/account.php');
                } else {
                    $_SESSION['error'] = '<span class="" style="color: crimson">Wrong login or password!</span>';
                    $_SESSION['show'] = 'show';
                    $_SESSION['transparentBcg'] = 'transparentBcg';
                    header('Location: ../../index.php');
                } 
            } else {
                $_SESSION['error'] = '<span class="" style="color: crimson">Wrong login or password!</span>';
                $_SESSION['show'] = 'show';
                $_SESSION['transparentBcg'] = 'transparentBcg';
                header('Location: ../../index.php');         
            }
        } else {
            $_SESSION['error'] = '<span class="" style="color: crimson">Wrong login or password!</span>';
            $_SESSION['show'] = 'show';
            $_SESSION['transparentBcg'] = 'transparentBcg';
            header('Location: ../../index.php'); 
        }
        $connection->close();
    }
?>



