# Build du Projet

## Avant de builder le projet

1 - Renommer le fichier .env.sample à la racine en .env et compléter les entrées
2 - Renommer le fichier .env.sample à la racine du dossier backend en .env et compléter les entrées

### Pour builder et démarrer le projet via Docker

A la racine du projet, lancer la commande suivante

```bash
 docker compose -f docker-compose.dev.yml up --build
```

- Pour accéder au front, depuis le navigateur :

[http://localhost:3000]

- Pour accéder à l'interface Apollo Client

[http://localhost:4000]

- Pour accéder à Admirer et la base de données

[http://localhost:8080]

Les informations de connexion sont celles renseignées dans les fichiers .env à la racine

#### Pour populer la BDD avec un jeu de données

La bdd sera automatiquement populer aprés l'initialisation de la BDD SI un compte admin n'est pas présent dans la BDD

Le jeu de données qui sera intégré est visible dans le dossier /backend/src/dummyDatas.

Pour se connecter, utiliser les informations de connexion qui se trouvent dans /backend/src/dummyDatas (DummyUser)
