# P7-GROUPOMANIA-créez un réseau social d'entreprise

# Compétences évaluées

- Gérer un stockage de données à l'aide de SQL

- Personnaliser le contenu envoyé à un client web

- Implémenter un stockage de données sécurisé en utilisant SQL

- Authentifier un utilisateur et maintenir sa session

# Installez l'application de Groupomania
# BACKEND
Le backend a été crée avec Node.js, Express.js et MySQL comme base de données.

Installation ORM Sequelize + création et migrations des modèles des tables vers la base de données après sa création

Depuis le terminal backend du dossier on saisie dans l'ordre:

- npm install -g sequelize-cli, 
- npm install --save sequelize, 
- npm install mysql --save, 
- npm install mysql2 --save, 
- sequelize init

- Créer localement (depuis le terminal backend) les tables de la base de donnée en s'inspirant de mon dossier "models" (ex : depuis le terminal backend on saisie: sequelize model:create –attributes «email:string….  » --name User, création de la table User)
- Créer localement la base de donnée (ex: depuis le terminal "MySQL Commande Line Client" on saisie : create database database_development_groupomania;)
  ensuite on migre les tables créées vers la base de donnée : sequelize db:migrate
- Les tables sont désormais disponible dans la base de donnée

# Installation
- Dans le dossier backend
- Démarrer npm install pour installer toutes les dépendances du backend.

# Serveur 
- Démarrer nodemon server pour avoir accès au serveur de développement. 
- L'application va se recharger automatiquement si vous modifiez un fichier source.

# FRONTEND
Le frontend a été crée avec Vues.js

# Installation
- Dans le dossier /frontend 
- Démarrez npm install pour installer toutes les dépendances du frontend.

# Serveur
- Démarrer npm run serve pour avoir accès au serveur de développement. 
- L'application va se recharger automatiquement si vous modifiez un fichier source.

# Droits Admin
Pour modifier un utilisateur en administrateur directement depuis le terminal MySQL on saisie : UPDATE users SET isAdmin = ‘1‘, WHERE id = numéro id du user qu’on souhaite modifier en administrateur;
