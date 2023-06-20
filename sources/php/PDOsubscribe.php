<?php
session_start();

if (isset($_POST['email'])) {
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    if (empty($email)) {
        $_SESSION['subscribe_message'] = 'error';
        header('Location: ../../pages/ourstory.php');
    } else {
        require_once 'PDOdatabase.php';
        $emails = $db->query(sprintf("SELECT id FROM users WHERE email='%s'", $email));
        if ($emails->rowCount() > 0) {
            $_SESSION['subscribe_message'] = 'error';
            header('Location: ../../pages/ourstory.php');
            exit();
        } else {
            $query = $db->prepare('INSERT INTO users VALUES (NULL, :email)');
            $query->bindValue(':email', $email, PDO::PARAM_STR);
            $query->execute();
            $_SESSION['subscribe_message'] = 'success';
            header('Location: ../../pages/ourstory.php');
        }
    }
} else {
    $_SESSION['subscribe_message'] = 'error';
    header('Location: ../../pages/ourstory.php');
    exit();
}

?>