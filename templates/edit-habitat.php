<?php 
include 'verifyRole.php';
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

$habitatsTable = new DatabaseTable($pdo,'habitat','habitat_id');
$imagesTable = new DatabaseTable($pdo,'image','image_id');
$habitat = $habitatsTable->selectLine($_GET['id']);
$imageLine = $imagesTable->selectLine($habitat['image_id']);

$nom = htmlspecialchars($habitat['nom']);
$description = htmlspecialchars($habitat['description']);
$commentaire = htmlspecialchars($habitat['commentaire_habitat']);
$imageId = htmlspecialchars($habitat['image_id']);
$image = $imagesTable->selectLine($imageId)['image_name'];

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
    <?php include 'header.php'?>
    
    <form method='post' enctype='multipart/form-data'>
        <h1>Modifier données</h1>
        <div>
            <img src='<?= '../uploads/habitats/' . $image?>'>
        </div>
        <div>
            <label>Nom</label>
            <input type='text' name='nom' value='<?=$nom ?>'> 
        </div>
        <div>
            <label>Description</label>
            <textarea  name='description'><?= $description?></textarea> 

        </div>
        <div>
            <label>Commentaire</label>
            <textarea  name='commentaire_habitat'><?= $commentaire?></textarea> 
        </div>
        <div>
            <label for='file'>Nouvelle Image</label>
            <input type='hidden' name='image_id' value='<?=$imageId?>'>
            <input type='file' name='image'>
        </div>
        
        
        <input type='submit' class='button' name='submit-btn' value='Enregistrer'>
    </form>
</body>
</html>



<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Initialiser les variables d'erreur et de succès
    $error = '';
    $success = '';

    // Check if the file upload input is not empty
    if (!empty($_FILES['image']['name'])) {
        $allowed = ['jpg', 'jpeg', 'png'];
        $fileName = $_FILES['image']['name'];
        $fileSize = $_FILES['image']['size'];
        $fileTmp = $_FILES['image']['tmp_name'];
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Vérifier l'extension du fichier
        if (!in_array($fileExt, $allowed)) {
            $error = "Format de fichier non autorisé. Seuls les fichiers JPG, JPEG, PNG, sont autorisés.";
        } else {
            // Générer un nom unique pour l'image
            $uniqueName = uniqid('', true) . '.' . $fileExt;
            $uploadDir = '../uploads/habitats/';
            $uploadFile = $uploadDir . $uniqueName;

            // Déplacer le fichier uploadé dans le répertoire uploads
            if (!move_uploaded_file($fileTmp, $uploadFile)) {
                $error = "Erreur lors du déplacement du fichier.";
            } else {
                $imageFields = [
                    'image_name' => $uniqueName
                ];
                // Assurez-vous que $imagesTable et $habitat['image_id'] sont définis
                $imagesTable->update($imageFields, $habitat['image_id']);
                $success = "Fichier téléchargé et enregistrement mis à jour avec succès.";
            }
        }
    }

    if (!$error) {
        $habitatFields = [
            'nom' => htmlspecialchars($_POST['nom']),
            'description' => htmlspecialchars($_POST['description']),
            'commentaire_habitat' => htmlspecialchars($_POST['commentaire_habitat']),
            'image_id' => htmlspecialchars($_POST['image_id'])
        ];

        // Assurez-vous que $habitatsTable et $habitat['habitat_id'] sont définis
        $habitatsTable->update($habitatFields, $habitat['habitat_id']);
        header('location: habitats-crud.php');
        exit();
    } else {
        // Afficher le message d'erreur
        echo $error;
    }

    // Afficher le message de succès
    if ($success) {
        echo $success;
    }
}
?>
