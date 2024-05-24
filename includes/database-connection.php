<?php


try {
    $db_host = 'eu-cluster-west-01.k8s.cleardb.net ';
    $db_user = 'b65e2983e64271';
    $db_pass = '8d42dec8';
    $db_name = 'heroku_f15235858c65942';
    /* $pdo = new PDO('mysql:dbname=arcadia_db;host=127.0.0.1','root',''); */
    $pdo = new PDO("mysql:dbname=$db_name;host=$db_host",$db_user,$db_pass);
} catch (PDOException $error) {
    echo '<h1>' . 'Une erreur est survenue' .'</h1>' ;
}



