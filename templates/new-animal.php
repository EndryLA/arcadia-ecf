<?php 
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';


$animalsTable = new DatabaseTable($pdo,'animal','animal_id');
$imagesTable = new DatabaseTable($pdo,'image','image_id');
$raceTable = new DatabaseTable($pdo,'race','race_id');
$vetReportTable = new DatabaseTable($pdo,'rapport_veterinaire','rapport_veterinaire_id');
$habitatTable = new DatabaseTable($pdo,'habitat','habitat_id');

$habitats = $habitatTable->getAll();
$races = $raceTable->getAll();
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
        <h1>Ajouter Animal</h1>
        <div>
            <label for='prenom'>Prenom</label>
            <input type='text' name='prenom' value=''> 
        </div>
        
        <div>
            <label>Race</label>
            <input name='race'> 
        </div>

        <div>
            <label for='habitat'>habitat</label>
            <select name='habitat'>
                <?php foreach($habitats as $habitat) {;?>
                    <option value='<?= htmlspecialchars($habitat['habitat_id'])?>'><?= htmlspecialchars($habitat['habitat_id']) . ' - ' . htmlspecialchars($habitat['nom'])?></option>
                <?php } ?>
            </select>
        </div>

        <div>
            <label>Image de l'animal</label>
            <input class='file-input' type='file' name='image' id='file' placeholder='Selectionnez une image'>
        </div>
        <input type='submit' class='button' name='submit-btn' value='Enregistrer'>
    </form>
</body>
</html>

<?php 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Initialiser les variables d'erreur et de succès


  $animalName = htmlspecialchars($_POST['prenom']);
  $race = htmlspecialchars($_POST['race']);
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
      $uploadDir = '../uploads/animals/';
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

    $raceFields = [
      'label' => htmlspecialchars($_POST['race'])
    ];
    $raceTable->insert($raceFields);  

    $associatedRaceId = $raceTable->selectLine2('label',$_POST['race'])[0]['race_id'];
    $associatedImageId = $imagesTable->selectLine2('image_name',$uniqueName)[0]['image_id'];


    $animalFields = [
      'prenom' => htmlspecialchars($_POST['prenom']),
      'race_id' => htmlspecialchars($associatedRaceId),
      'image_id' => $associatedImageId,
      'habitat_id' => htmlspecialchars($_POST['habitat'])
    ]; 
    $animalsTable->insert($animalFields);
  }
      
    // Afficher les messages d'erreur ou de succès
    if ($error) {
      echo $error;
    } else {
      echo $success;
    }
}
?>

