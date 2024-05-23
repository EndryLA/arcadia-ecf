<?php 
session_start();
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

$commentsTable = new DatabaseTable($pdo,'avis','avis_id');
$comments = $commentsTable->selectLine($_GET['id']);

$pseudo = $comments['pseudo'];
$commentaire = $comments['commentaire'];
$isVisible = $comments['isVisible'];

if (isset($_POST['submit-btn'])) {
    $fields = [
        'pseudo' => $_POST['pseudo'],
        'commentaire' => $_POST['commentaire'],
        'isVisible' => $_POST['visibility']
    ];
    $commentsTable->update($fields,$_GET['id']);
    header('location: comments-crud.php?id=' . $comments['avis_id']);
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../public/code/css/styles.css">

</head>
<body>
    <?php include 'header.php'?>
    
    <form method='post'>
        <h1>Validation de commentaires</h1>
        <div>
            <label>Pseudo</label>
            <input type='text' name='pseudo' value='<?=$pseudo ?>'> 
        </div>
        <div>
            <label>Commentaire</label>
            <textarea name='commentaire'><?=$commentaire ?></textarea>
        </div>
        <div>
            <label for='visibility'>Afficher sur la page principale ?</label>
            <select name='visibility'>
                <option <?php if($isVisible == 'oui'){echo("selected");}?>>oui</option>
                <option <?php if($isVisible == 'non'){echo("selected");}?>>non</option>
            </select>
        </div>
        <input type='submit' class='button' name='submit-btn'>
    </form>
</body>
</html>

