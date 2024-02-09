# Configuration de Nodemailer avec Gmail


Nodemailer est une bibliothèque populaire pour Node.js qui facilite l'envoi d'emails. Pour l'utiliser avec Gmail, une configuration spécifique du transporteur est nécessaire. Voici un aperçu de cette configuration.
On definit par quel service le mail sera envoyé et quel sera l hôte '(serveur smtp)'

```javascript
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Utilisation de SSL
    auth: {
        user: emailUser, // Votre adresse email Gmail
        pass: emailPass, // Votre mot de passe Gmail
    },
});
```

# Fonction d'envoi d'email de validation

Cette fonction permet d'envoyer un email de validation à un utilisateur en utilisant Node.js et Nodemailer avec un service de messagerie Gmail.

## Fonctionnement

La fonction `sendValidationEmail` prend deux paramètres :
- `email` : l'adresse email de l'utilisateur à qui l'email de validation sera envoyé.
- `token` : un jeton de validation unique qui sera inclus dans l'url de validation envoyée à l'utilisateur.

L'email envoyé contiendra un lien que l'utilisateur pourra cliquer pour valider son compte. Ce lien inclura le `token` de validation comme paramètre de requête.

## Configuration

Avant d'utiliser cette fonction, il faut configurer quelques variables d'environnement pour l'authentification SMTP avec Gmail :

- `emailUser` : Votre adresse email Gmail utilisée pour envoyer l'email.
- `emailPass` : Le mot de passe de votre compte Gmail. Il est recommandé d'utiliser un mot de passe d'application si l'authentification à deux facteurs est activée pour votre compte.

Vous devez également définir la variable `baseUrl`, qui représente l'URL de base du site web. Cette URL sera utilisée pour construire le lien de validation inclus dans l'email.

## Exemple d'utilisation

```javascript
const email = "destinataire@example.com";
const token = "tokenDeValidationUnique";

sendValidationEmail(email, token)
  .then(() => {
    console.log("Email de validation envoyé avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de l'envoi de l'email de validation :", error);
  });
```


