<?php

include 'verifyRole.php';
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';





if(isset($_POST['modify'])) {
    if ($_SESSION['role'] == 2) {
        header('location: rapport.php?id='. $_POST['animal_id']);

    } else {
        header('location: edit-animal.php?id='. $_POST['animal_id']);
    }
}
if (isset($_POST['new-animal'])) {
    header('location: new-animal.php');
}

?>






<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../public/code/css/styles.css">
    <link rel="stylesheet" href="../public/code/css/crud-styles.css">

</head>
<body>
    <?php
    include 'header.php';
    $animalsTable = new DatabaseTable($pdo,'animal','animal_id');
    $imagesTable = new DatabaseTable($pdo, 'image', 'image_id');
    $raceTable = new DatabaseTable($pdo, 'race', 'race_id');
    $habitatTable = new DatabaseTable($pdo, 'habitat', 'habitat_id');
    
    $animals = $animalsTable->getAll();
    $races = $raceTable->getAll();
    $habitats = $habitatTable->getAll();

    
    

    ?>

<h1 style='text-align:center;margin-bottom:40px;'>Liste d'animaux</h1>
<table class="table">
    
  <thead>
    <tr>
      <th scope="col">Prenom</th>
      <th scope="col">Etat</th>
      <th scope="col">Race</th>
      <th scope="col">Habitat</th>
    </tr>
  </thead>
  <tbody>
    <?php 
        $usersTable = new DatabaseTable($pdo,'utilisateur','username');
        $users = $usersTable->getAll();
        foreach($animals as $animal) { ?>
        <tr>
            <td><?= $animal['prenom']?></td>
            <td><?= $animal['etat']?></td>
            <td><?= $raceTable->selectLine($animal['race_id'])['label']?></td>
            <td><?= $habitatTable->selectLine($animal['habitat_id'])['nom']?></td>
            <td>
                <form action='' method='post'>
                    <input type='hidden' name='animal_id' value='<?=$animal['animal_id'] ?>'>
                    <input type='submit' name='modify' value='Modifier'>
                </form>
            </td>
            <td>
                <form action='' method='post'>
                    <input id='' type='hidden' name='userid' value='<?=$animal['animal_id']?>'>
                    <input id ='deleteUser' type='submit' value='Supprimer'>
                </form>
            </td>
            
        </tr>
        
    <?php } ?>

</tbody>
</table>
<form method='post'>
        <input type="submit" class='button' style='margin:auto;' name='new-animal' value='Nouveau'>
    </form>
<!-- <div class='confirmation-modal' id='confirmationModal'>
    <div class='modal-content'>
        <span id='close-btn'>&times;</span>
        <p>Etes vous sûr de vouloir supprimer cette entrée ?</p>
    </div>
</div>

<script src='../public/code/js/confirmation-modal.js'></script> -->
</body>
</html>


