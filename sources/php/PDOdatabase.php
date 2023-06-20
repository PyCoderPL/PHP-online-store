<?php

$config = require_once 'PDOconfig.php';

try {
    $db = new PDO("mysql:
        host={$config['host']};
        dbname={$config['db_name']};
        port={$config['db_port']};
        charset=utf8",$config['db_user'],$config['db_pass'], array(
            PDO::ATTR_EMULATE_PREPARES => false, 
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION            
        ));

} catch (PDOException $error) {
    echo $error->getMessage();
    exit();
}

?>