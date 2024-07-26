## Instructions de connexion et de mise à jour du serveur

### Connexion au serveur

Pour vous connecter au serveur, utilisez la commande suivante :

```sh
ssh wns_student@0923-rouge-1.wns.wilders.dev -p 2269
```

### Mise à jour du serveur

Pour mettre à jour le serveur, exécutez les commandes suivantes :

```sh
sudo apt update
sudo apt upgrade
```

## Création de l'environnement de production

### Création d’un dossier `apps`

Pour créer un dossier `apps`, utilisez la commande :

```sh
mkdir apps
```

### Création de dossiers dans `apps`

Allez dans le dossier `apps` et créez un dossier `production` :

```sh
cd apps
mkdir production
```

### Importer des fichiers dans `production`

Dans le dossier `production`, importez les fichiers `docker-compose.prod.yml` et `nginx.conf`.

### Créez un fichier `.env`

```sh
sudo nano .env
```

## Configuration de Caddy

### Ouvrez le fichier `CaddyFile` :

```sh
sudo nano /etc/caddy/Caddyfile
```

### Ajoutez les lignes suivantes dans le fichier `CaddyFile` :

```
0923-rouge-1.wns.wilders.dev {
        # Set this path to your site's directory.
        #root * /usr/share/caddy

        # Enable the static file server.
        #file_server

        # Another common task is to set up a reverse proxy:
        reverse_proxy localhost:8000
        #log
        log {
                output file /var/log/caddy/production.log
        }
        # Or serve a PHP site through php-fpm:
        # php_fastcgi localhost:9000
}
```

### Redémarrez le service Caddy :

```sh
systemctl reload caddy
```

## Modification sur fichier de production

### Modification dans le dossier `production`

Allez dans le dossier `production` :

```sh
cd production
```

### Modifiez le fichier `docker-compose.prod.yml` :

```sh
sudo nano docker-compose.prod.yml
```

### Modifiez les tags d’images `frontend` et `backend` pour les faire correspondre à la dernière version de production.

### Créez un fichier `fetch-deploy.sh`

```sh
sudo nano fetch-deploy.sh
```

### Ajoutez le texte suivant dans `fetch-deploy.sh` :

```sh
#!/bin/sh
# fetch -deploy.sh
docker compose -f docker.compose.prod.yml down && \
    docker compose -f docker.compose.prod.yml pull && \
    GATEWAY_PORT=8000 docker compose -f docker.compose.prod.yml up -d;
```

## Démarrage de la production

### Ensuite, exécutez le fichier `fetch-deploy.sh` :

```sh
bash fetch-deploy.sh
```
