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


# Configuration validation de compte et reinitialisation de mdp

creation des mutations 

```javascript
 @Mutation(() => Boolean)
  async validateAccount(
  @Arg("token") token: string
): Promise<boolean> {
  console.log("validateAccount called with token:", token);
  console.log("Searching for user with token...");
  const user = await User.findOneBy({ email_validation_token: token });
  if (!user) {
    console.log("User not found with token:", token);
    throw new Error("User not found" ); 
  }
  const tokenExpired = user.email_validation_token_expires ? Date.now() > user.email_validation_token_expires.getTime() : true; 
  console.log("Token expired status:", tokenExpired);

  if (tokenExpired) {
    throw new Error("Token expired"); 
  } else {
    user.is_account_validated = true;
    user.email_validation_token = null; 
    user.email_validation_token_expires = null; 
    console.log("Updating user account validation status...");
    await user.save();
    console.log("User account validated successfully.");
    return true;
  }
}
```

```javascript
@Mutation(() => Boolean)
async resendValidationEmail(
  @Arg("email") email: string
): Promise<boolean> {
  const user = await User.findOneBy({ email });
  if (!user) {
    throw new Error("User not found");
  }
  // Générer un nouveau token de validation
  const token = randomBytes(48).toString('hex');
  user.email_validation_token = token;
  user.email_validation_token_expires = new Date(Date.now() + 3600000); // Expiration dans 1 heure  
  await user.save();
  // Appeler la fonction d'envoi d'email
  await sendValidationEmail(user.email, user.email_validation_token);

  return true;
}
```

```javascript
@Mutation(() => Boolean)
async resendValidationEmail(
  @Arg("email") email: string
): Promise<boolean> {
  const user = await User.findOneBy({ email });
  if (!user) {
    throw new Error("User not found");
  }
  // Générer un nouveau token de validation
  const token = randomBytes(48).toString('hex');
  user.email_validation_token = token;
  user.email_validation_token_expires = new Date(Date.now() + 3600000); // Expiration dans 1 heure  
  await user.save();
  // Appeler la fonction d'envoi d'email
  await sendValidationEmail(user.email, user.email_validation_token);

  return true;
}
```

```javascript
@Mutation(() => Boolean)
async requestPasswordReset(
  @Arg("email") email: string
): Promise<boolean>{
  const user = await User.findOneBy({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const token = randomBytes(48).toString('hex');
  user.reset_password_token = token;
  user.reset_password_token_expires = new Date(Date.now() + 3600000); // Expiration dans 1 heure
  await user.save();
    // Appeler la fonction d'envoi d'email pour la réinitialisation du mot de passe
    await sendResetPasswordEmail(user.email, user.reset_password_token);

    return true;
}
```
```javascript
@Mutation(() => Boolean)
async resetPassword(
  @Arg("token") token: string,
  @Arg("newPassword") newPassword: string
): Promise<boolean> {
  const user = await User.findOneBy({ reset_password_token: token });
  if (!user) {
    throw new Error("Token invalid or expired");
  }
  // Mettre à jour le mot de passe de l'utilisateur
  user.hashed_password = await argon2.hash(newPassword);
  // Nettoyer les champs du token de réinitialisation
  user.reset_password_token = null;
  user.reset_password_token_expires = null;

  await user.save();
  console.log("Update account validated successfully.");
  return true;
}
```

Dans request/user il faut rajouter ces mutations 

```javascript
export const VALIDATE_ACCOUNT = gql`
  mutation ValidateAccount($token: String!) {
    validateAccount(token: $token)
  }
`;
```

```javascript
export const RESEND_VALIDATION_EMAIL = gql`
  mutation ResendValidationEmail($email: String!) {
    resendValidationEmail(email: $email)
  }
`;
```

```javascript
export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;
```

```javascript
export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

```

page /validation va prendre la mutation Validate_Account
page /token-expired va prendre la mutation RESEND_VALIDATION_EMAIL
page /request-reset-password va prendre la mutation REQUEST_PASSWORD_RESET
page /reset-password va prendre la mutation RESET_PASSWORD