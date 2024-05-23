<?php
include 'verifyRole.php';
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';



?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcadia</title>
    <link rel="stylesheet" href="../public/code/css/styles.css">
    <link rel="stylesheet" href="../public/code/css/crud-styles.css">
</head>
<body>
    <?php include 'header.php'; ?>
    <table class="table">
    <thead>
      <tr>
        <th scope="col">Nom</th>
        <th scope="col">Prénom</th>
      </tr>
    </thead>
    <tbody>
      <?php 
          $servicesTable = new DatabaseTable($pdo,'service','service_id');
          $services = $servicesTable->getAll();

          foreach($services as $service) { ?>
            
          <tr>
              <td><?= $service['nom']?></td>
              <td><?= $service['description']?></td>
              <td>
                  <form action='' method='post'>
                      <input type='hidden' name='service_id' value='<?=htmlspecialchars($service['service_id']) ?>'>
                      <input type='submit' name='modify' value='Modifier'>
                  </form>
              </td>
              <td>
                  <form action='' method='post'>
                      <input id='' type='hidden' name='service_id' value='<?=htmlspecialchars($service['service_id'])?>'>
                      <input id ='deleteUser' name='delete' type='submit' value='Supprimer'>
                  </form>
              </td>
              
          </tr>
          

          <?php 
            if(isset($_POST['modify'])) {
                header('location: service.php?id='.htmlspecialchars($_POST['service_id']));
            }
            if(isset($_POST['delete'])) {
                $servicesTable->delete($_POST['service_id']);
            }
            ?>
          
      <?php } ?>
    
    </tbody>
    </table>

</body>
</html>


