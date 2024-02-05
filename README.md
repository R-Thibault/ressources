#### Avant de builder le projet :

1 - Renommer le fichier .env.sample à la racine en .env et compléter les entrées
2 - Renommer le fichier .env.sample à la racine du dossier backend en .env et compléter les entrées

#### Pour builder et démarrer le projet via Docker :

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

#### Pour populer la BDD avec un jeu de données :

Le jeu de données qui sera intégré est visible dans le dossier /backend/src/dummyDatas.
Une fois les 3 projets lancés, se rendre sur [http://localhost:4000]
Depuis un nouvel onglet d'Apollo client, executer les requêtes suivantes :

```bash
mutation Mutation {
  populateTagTable {
    title
    id
  }
  populateCategoryTable {
    id
    title
  }
  populateUserTable {
    email
  }
  populateAdsTable {
    ads {
      id
      title
    }
    maxPrice
  }
}
```

Pour se connecter, utiliser les informations de connexion qui se trouvent dans /backend/src/dummyDatas (DummyUser)
