<?php
include 'verifyRole.php';
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

if(isset($_POST['modify'])) {
    echo $_POST['habitat_id'];
    header('location: edit-habitat.php?id='. $_POST['habitat_id']);
}
if (isset($_POST['new-animal'])) {
    header('location: new-habitat.php');
}

?>

<!DOCTYPE html>
<html lang="fr  ">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcadia</title>
    <link rel="stylesheet" href="../public/code/css/styles.css">
    <link rel="stylesheet" href="../public/code/css/crud-styles.css">

</head>
<body>
    <?php
    include 'header.php';
    $imagesTable = new DatabaseTable($pdo, 'image', 'image_id');
    $habitatTable = new DatabaseTable($pdo, 'habitat', 'habitat_id');
    
    $habitats = $habitatTable->getAll();
    ?>

<h1 style='text-align:center;margin-bottom:40px;'>Liste d'habitats</h1>
<table class="table">
    
  <thead>
    <tr>
      <th scope="col">Nom</th>
      <th scope="col">Description</th>
      <th scope="col">commentaire_habitat</th>
      <th scope="col">image_id</th>
    </tr>
  </thead>
  <tbody>
    <?php 
        $usersTable = new DatabaseTable($pdo,'utilisateur','username');
        $users = $usersTable->getAll();
        foreach($habitats as $habitat) { ?>
        <tr>
            <td><?= htmlspecialchars($habitat['nom'])?></td>
            <td><?= htmlspecialchars($habitat['description'])?></td>
            <td><?= htmlspecialchars($habitat['commentaire_habitat'])?></td>
            <td><img width=200px; class='crud-img' src='<?= '../uploads/habitats/' . $imagesTable->selectLine($habitat['image_id'])['image_name']?>'></td>
            <td>
                <form action='' method='post'>
                    <input type='hidden' name='habitat_id' value='<?=$habitat['habitat_id'] ?>'>
                    <input type='submit' name='modify' value='Modifier'>
                </form>
            </td>
            <td>
                <form action='' method='post'>
                    <input id='' type='hidden' name='habitat_id' value='<?=$habitat['habitat_id']?>'>
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

<?php 

?>

