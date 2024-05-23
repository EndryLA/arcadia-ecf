<?php
include __DIR__ . '/../includes/database-connection.php';
include __DIR__ . '/../classes/DatabaseTable.php';

$commentsTable = new DatabaseTable($pdo,'avis','avis_id');
$comments = $commentsTable->selectLine2('isVisible','oui');

?>


<div class="comment-section section-wrapper">
    <h2 class='align-center'>Commentaires</h2>
    <div class="comments-container">
        <?php foreach($comments as $comment) { ?>
            <div class='comment'>
                <h4 class='comment-pseudo'><?= htmlspecialchars($comment['pseudo']) ?></h4>    
                <p class='comment-text'><?= htmlspecialchars($comment['commentaire']) ?></p>
            </div>

        <?php } ?>
            
    </div>

    <h2 class='align-center'>Laisser un commentaire</h2>

    <form method='post'>
        <div>
            <label for="username">Nom</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="comment">Commentaire</label>
            <textarea id="comment" name="comment" required></textarea>
        </div>
        <input type="submit" class='button' name='submit-btn'>
    </form>
</div>

<?php

if (isset($_POST['submit-btn'])) {

    if (!empty($_POST['username']) && !empty($_POST['comment'])) {
        $fields = [
            'pseudo' =>  htmlspecialchars($_POST['username'],ENT_QUOTES),
            'commentaire' =>  htmlspecialchars($_POST['comment'],ENT_QUOTES),
        ];
        
        $commentsTable->insert($fields);
    }


}

