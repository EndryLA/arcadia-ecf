<?php

try {
    $pdo = new PDO('mysql:dbname=arcadia_db;host=127.0.0.1','root','');
} catch (PDOException $error) {
    echo '<h1>' . 'Une erreur est survenue' .'</h1>' ;
}


$db_host = '';
$db_user = '';
$db_pass = '';
$db_name = '';

$pdo2 = new PDO('mysql:dbname='. $db_name . ';host=' . $db_host,$db_user,$db_pass);