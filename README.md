
#Mise en place de l'environnement de travail

Pour mon frontend, j'ai commencé par initialisé un projet React à l'aide de ViteJs.
Puis j'ai installé les différences dépendances de mon site : 

-axios : pour gérer les requêtes envoyés à mon API.
-react-router-dom : pour gérer le routing de notre appplication.

Pour mon backend, dans un dossier appelé "backend" j'ai initialisé un projet node à l'aide de la commande npm init.
Puis avec la commande "npm install" j'ai installé les différentes dépendances nécessaires à mon projet.
(Il est important de noter que toutes les dépendances n'ont pas été installés à ce moment, mais au fûr et à mesure des besoin du projet)

Voici la liste des dépendances installées pour mon projet :

-express : afin d'utiliser le framework express pour la création de notre API.
-mongoose : pour intégrer avec notre base de données MongoDB.
-dotenv : afin de ne pas mettre dans notre code (qui est public) des données sensibles qui ne doivent pas accessibles.
-cors : il s'agit d'un middleware permettant au serveur de gérer des requêtes externe au serveur. 
-bcrypt : afin de crypter nos données en base de données (nos mots de passe)
-jsonwebtoken : afin de gérer l'authentification de notre backend.
-multer : pour la gestion des fichiers (images) côté backend
-nodemailer : pour gérer l'envoi de mail de notre site.
-express-validator : pour valider les données envoyé au serveur, afin de sécuriser les demandes.
-helmet


#

Pour déployer l'application en mode local il faut lancer simultanément le backend et le frontend.
Il faut installer la liste de dépendances notés ci-dessus, créer les fichiers .env coté front et coté back, puis lancer le site en mode local.
Pour les données des fichiers .env veuillez regarder le manuel de d'utilisation 