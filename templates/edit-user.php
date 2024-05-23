<?php 
include 'verifyRole.php';
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

$user = new DatabaseTable($pdo,'utilisateur','username');
$userData = $user->selectLine($_GET['userid']);

$lastname = htmlspecialchars($userData['nom']);
$firstname = htmlspecialchars($userData['prenom']);
$username = htmlspecialchars($userData['username']);
$password = htmlspecialchars($userData['password']);
$roleId = htmlspecialchars($userData['role_id']);
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
    
    <form method='post'>
        <h1>Modifier données</h1>
        <div>
            <label>Nom</label>
            <input type='text' name='lastname' value='<?=$lastname ?>'> 
        </div>
        <div>
            <label>Prenom</label>
            <input type='text' name='firstname' value='<?=$firstname?>'> 
        </div>
        <div>
            <label>nom d'utilisateur</label>
            <input type='text' name='username' value='<?= $username?>'> 
        </div>
        <div>
            <label>mot de passe</label>
            <input type='text' name='password' value='<?= $password?>'> 
        </div>
        <div>
            <select name="role" id="">
                <option value='2' <?php if($roleId == '2'){echo("selected");}?>>Vétérinaire</option>
                <option value='3' <?php if($roleId == '3'){echo("selected");}?>>Employé</option>
            </select>
        </div>
        <input type='submit' class='button' name='submit-btn' value='Enregistrer'>
    </form>
</body>
</html>




<?php 

if (isset($_POST['submit-btn'])) {
    $fields = [
        'username' => htmlspecialchars($_POST['username']),
        'nom' => htmlspecialchars($_POST['lastname']),
        'prenom' => htmlspecialchars($_POST['firstname']),
        'password' => password_hash($_POST['password'],PASSWORD_DEFAULT),
        'role_id' => htmlspecialchars($_POST['role'])
     ];
    var_dump($fields);

    
    $user->update($fields,$username);
    header('location: employe-crud.php');
}
