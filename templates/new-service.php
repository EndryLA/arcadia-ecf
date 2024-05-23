<?php 

include 'verifyRole.php';
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

$servicesTable = new DatabaseTable($pdo,'service','service_id');

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
        <h1>Modifier données</h1>

        <div>
            <label>Nom</label>
            <input type='text' name='name' required> 
        </div>

        <div>
            <label>Description</label>
            <textarea type='text' name='description' required> </textarea>
        </div>
        <input type='submit' class='button' name='submit-btn' value='Enregistrer'>
    </form>

</body>
</html>




<?php 

if (isset($_POST['submit-btn'])) {
    $fields = [
        'nom' => htmlspecialchars($_POST['name']),
        'description' => htmlspecialchars($_POST['description']),
    ];

    
    $servicesTable->insert($fields);
    header('location: animal-crud.php');
}
