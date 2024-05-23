<?php

include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

$vetReportTable = new DatabaseTable($pdo,'rapport_veterinaire','rapport_veterinaire_id');
$animalTable = new DatabaseTable($pdo,'animal','animal_id');


$animalId = $_GET['id'];
$rapportVeterinaire = $vetReportTable->selectLine($_GET['id']);
$animal = $animalTable->selectLine($_GET['id']);

?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arcadia</title>
    <link rel="stylesheet" href="../public/code/css/styles.css">
</head>
<body>
    <?php
    include 'verifyRole.php'; 
    include 'header.php';
    ?>

    <form method='post'>
        <h1>Rapport Vétérinaire</h1>
        <p></p>
        <div>
            <label>Etat de l'animal</label>
            <input type='text' name='animal-state' value='<?=htmlspecialchars($animal['etat'])?>'> 
        </div>
        <div>
            <label>Nourriture proposée</label>
            <input type='text' name='nourriture' value='<?=htmlspecialchars($rapportVeterinaire['nourriture'])?>'> 
        </div>
        <div>
            <label>Grammage de la nourriture</label>
            <input type='text' name='grammage' value='<?=htmlspecialchars($rapportVeterinaire['grammage'])?> '> 
        </div>
        <div>
            <label>Date de passage</label>
            <input type='date' name='report-date' value='<?php date('Y-m-d')?>'> 
        </div>
        <div>
            <label>Detail de l'état de l'animal</label>
            <textarea name='report'><?= htmlspecialchars($rapportVeterinaire['detail']) ?></textarea>
        </div>
        <input name='submit-btn' class='button' value='Enregister' type='submit'>
    </form>
    
</body>
</html>

<?php

if (isset($_POST['submit-btn'])) {
    $VetReportFields = [
        'date' => htmlspecialchars($_POST['report-date']),
        'detail' => htmlspecialchars($_POST['report']),
        'nourriture' => htmlspecialchars($_POST['nourriture']),
        'grammage' => htmlspecialchars($_POST['grammage'])
    ];
    $vetReportTable->update($VetReportFields,$_GET['id']);

    $animalTable->update(['etat' => htmlspecialchars($_POST['animal-state'])],$_GET['id']);
}