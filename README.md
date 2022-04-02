# Projet_07_Groupomania

## Scénario 

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂
Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. 
Le but de cet outil est de faciliter les interactions entre collègues. 
Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau 
et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

## Prérequis

Vous devrez avoir Vue CLI, Node et MySQL déjà installés localement.

## Installation Backend 

▹ Clonez ce repository  
▹ A partir du dossier backend, créer votre base de données avec mySQL puis éxecutez `npx sequelize db:create` et `npx sequelize db:migrate`  
▹ Retirer l'extension `.example` sur le `.env` en remplaçant par vos informations MySQL pour accéder à votre base de données  
▹ Vérifier que les données contenues dans le fichier `config.json` sont correctes et correspondent à votre base de données  
▹ Créer un dossier "private" dans le dossier images pour la gestion des avatar et images des posts  
▹ Exécuter `npm install` pour installer les nodes_modules puis éxecuter `npm run start`  
▹ Le serveur doit fonctionner sur localhost avec le `port 5000`   

## Installation Frontend

▹ A partir du dossier frontend exécutez `npm install` puis `npm run dev`  
▹ L'application devrait se lancer sur localhost avec le port par défaut 3000  
