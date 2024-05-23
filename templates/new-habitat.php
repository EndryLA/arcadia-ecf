<?php 
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';


$imagesTable = new DatabaseTable($pdo,'image','image_id');
$habitatTable = new DatabaseTable($pdo,'habitat','habitat_id');

$habitats = $habitatTable->getAll();
/* var_dump($imagesTable->selectLine2('image_name','664f1dd6258ab4.74876686.jpg'))
 */
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
        <h1>Ajouter Habitat</h1>
        <div>
            <label for='prenom'>Nom</label>
            <input type='text' name='name' value='' required> 
        </div>
        
        <div>
            <label for='habitat'>Description</label>
            <textarea name='description' required></textarea>
        </div>

        <div>
            <label for='commentaire_habitat'>Commentaire</label>
            <textarea name='commentaire_habitat' required></textarea>
        </div>

        <div>
            <label>Image de l'habitat</label>
            <input class='file-input' type='file' name='image' id='file' placeholder='Selectionnez une image' required>
        </div>
        <div class='errors'>

        </div>
        <input type='submit' class='button' name='submit-btn' value='Enregistrer'>
    </form>
</body>
</html>

<?php 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Initialiser les variables d'erreur et de succès


  $imageId = '';
  $error = '';
  $success = '';

  // Vérifier la présence du fichier et des erreurs
  if (!isset($_FILES['image']) || $_FILES['image']['error'] != 0) {
      $error = "Erreur lors du téléchargement du fichier. absence de fichier";
  }

  if (!$error) {
      $allowed = ['jpg', 'jpeg', 'png'];
      $fileName = $_FILES['image']['name'];
      $fileSize = $_FILES['image']['size'];
      $fileTmp = $_FILES['image']['tmp_name'];
      $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

      // Vérifier l'extension du fichier
      if (!in_array($fileExt, $allowed)) {
          $error = "Format de fichier non autorisé. Seuls les fichiers JPG, JPEG, PNG, et GIF sont autorisés.";
      }
  }

  if (!$error) {
      // Générer un nom unique pour l'image
      $uniqueName = uniqid('', true) . '.' . $fileExt;
      $uploadDir = '../uploads/habitats/';
      $uploadFile = $uploadDir . $uniqueName;

      // Déplacer le fichier uploadé dans le répertoire uploads
      if (!move_uploaded_file($fileTmp, $uploadFile)) {
          $error = "Erreur lors du déplacement du fichier.";
      }
  }

  if (!$error) {
    $imageFields = [
      'image_name' => $uniqueName
    ];
    $imagesTable->insert($imageFields);

    $associatedImageId = $imagesTable->selectLine2('image_name',$uniqueName)[0]['image_id'];

    $habitatFields = [
      'nom' => htmlspecialchars($_POST['name']),
      'description' => htmlspecialchars($_POST['description']),
      'commentaire_habitat' => htmlspecialchars($_POST['commentaire_habitat']),
      'image_id' => $associatedImageId,
    ]; 
    $habitatTable->insert($habitatFields);
  }
      
    // Afficher les messages d'erreur ou de succès
    if ($error) {
      echo $error;
    } else {
      echo $success;
    }
}
?>

