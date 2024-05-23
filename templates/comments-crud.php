<?php 
include 'verifyRole.php';
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

$commentsTable = new DatabaseTable($pdo,'avis','avis_id');
$comments = $commentsTable->getAll();

if(isset($_POST['modify'])) {
    header('location: comment.php?id='. $_POST['avis-id']);
}
if (isset($_POST['delete'])) {
    $commentsTable->delete($_POST['avis-id']);
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcadia</title>
    <link rel="stylesheet" href="../public/code/css/styles.css">
    <link rel="stylesheet" href="../public/code/css/crud-styles.css">
</head>
<body>
    <?php include 'header.php'?>

<h1 style='text-align:center;margin-bottom:40px;'>Commentaires saisis</h1>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Pseudo</th>
      <th scope="col">Commentaire</th>
      <th scope="col">Visible</th>
    </tr>
  </thead>
  <tbody>
    
    <?php 
        $usersTable = new DatabaseTable($pdo,'utilisateur','username');
        $users = $usersTable->getAll();
        foreach($comments as $comment) { ?>
        <tr>
            <td><?= $comment['pseudo']?></td>
            <td><?= $comment['commentaire']?></td>
            <td><?= $comment['isVisible']?></td>
            <td>
                <form action='' method='post'>
                    <input type='hidden' name='avis-id' value='<?=htmlspecialchars($comment['avis_id'],ENT_QUOTES) ?>'>
                    <input type='submit' name='modify' value='Modifier'>
                </form>
            </td>
            <td>
                <form action='' method='post'>
                    <input id='' type='hidden' name='avis-id' value='<?=htmlspecialchars($comment['avis_id'],ENT_QUOTES)?>'>
                    <input name='delete' type='submit' value='Supprimer'>
                </form>
            </td>
            
        </tr>
        
    <?php } ?>
</tbody>
</table>
</body>
</html>

<?php
