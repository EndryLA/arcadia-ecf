<?php

include 'verifyRole.php';
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

$usersTable = new DatabaseTable($pdo,'utilisateur','username');
$rolesTable = new DatabaseTable($pdo,'role','role_id');
$users = $usersTable->getAll();

if(isset($_POST['modify'])) {
    header('location: edit-user.php?userid='. $_POST['userid']);
}
if (isset($_POST['supprimer'])) {
    $usersTable->delete($_POST['userid']);
}
if (isset($_POST['new-employe'])) {
    header('location: new-user.php');
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

<h1 style='text-align:center;margin-bottom:40px;'>Liste d'employés</h1>
<form method='post'>
    <input type='hidden' name='new-employe' >
    <input class='button' value='Ajouter Employé' type='submit'>
</form>
<table class="table">
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col">Nom d'utilisateur</th>
      <th scope="col">Mot de passe</th>
      <th scope="col">Poste</th>
    </tr>
  </thead>
  <tbody>
    <?php
        
        foreach($users as $userData) { ?>
        <tr>
            <td><?= htmlspecialchars($userData['nom'])?></td>
            <td><?= htmlspecialchars($userData['prenom'])?></td>
            <td><?= htmlspecialchars($userData['username'])?></td>
            <td><?= htmlspecialchars($userData['password'])?></td>
            <td><?= htmlspecialchars($rolesTable->selectLine($userData['role_id'])['label']) ?></td>
            <td>
                <form action='' method='post'>
                    <input type='hidden' name='userid' value='<?=htmlspecialchars($userData['username']) ?>'>
                    <input type='submit' name='modify' value='Modifier'>
                </form>
            </td>
            <td>
                <form action='' method='post'>
                    <input id='' type='hidden' name='userid' value='<?= htmlspecialchars($userData['username'])?>'>
                    <input id ='deleteUser' type='submit' value='Supprimer' name='supprimer'>
                </form>
            </td>
            
        </tr>
        
    <?php } ?>
</tbody>
</table>
</body>
</html>

<?php 




?>

