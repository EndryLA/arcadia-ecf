<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../public/code/css/styles.css">
    <link rel="stylesheet" href="../public/code/css/animal.css">
</head>
<body>
    <?php
    session_start();

    include __DIR__ . '/header.php';
    include __DIR__ . '/../includes/database-connection.php';
    include __DIR__ . '/../classes/DatabaseTable.php';
    
    $animalsTable = new DatabaseTable($pdo,'animal','animal_id');
    $vetReportTable = new DatabaseTable($pdo,'rapport_veterinaire','rapport_veterinaire_id');
    $raceTable = new DatabaseTable($pdo,'race','race_id');

    $animal = $animalsTable->selectLine($_GET['id']);
    $race = $raceTable->selectLine($animal['race_id'])['label'];
    ?>



    <div class='animal-page-wrapper'>
        <h1 class='align-center'><?= $animal['prenom']?></h1>
        <p><?= $race ?></p>
        <img src='../assets/images/bird.jpg' >
        <?php if (isset($_SESSION['role'])) {?>
            
            <div>
                <div class='animal-data-container'>
                    <div class='animal-data'>
                        <img class='data-logo' src='../assets/images/notes-medical-solid.svg'>
                        <p><?= $animal['etat'] ?></p>
                    </div>
                    <div class='animal-data'>
                        <img class='data-logo' src='../assets/images/calendar-days-solid.svg'>
                        <p>28-02-2024</p>
                    </div>
                    <div class='animal-data'>
                        <img class='data-logo' src='../assets/images/carrot-solid.svg'>
                        <p>regime de vers de terres</p>
                    </div>
                    <div class='animal-data'>
                        <img class='data-logo' src='../assets/images/scale-balanced-solid.svg'>
                        <p>20g</p>
                    </div>
    
                </div>
                
            <?php } ?>
            <div class='animal-description'>
                <h4>Description</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, atque numquam veritatis obcaecati ipsa tempora eius repellendus impedit tenetur alias similique earum? Aspernatur non facilis quod optio aut repudiandae consequatur doloremque incidunt numquam possimus ipsum obcaecati autem quos sequi at, consectetur molestiae maxime iste natus aliquid odio nostrum? At distinctio sit delectus ad omnis, necessitatibus esse fuga laudantium possimus quam quibusdam, eaque aut quasi molestiae sint? Ab, voluptatum perferendis sequi voluptas esse ut, voluptatibus reprehenderit quidem, facilis cumque quam ratione?</p>
            </div>
        </div>
    </div>

</body>

