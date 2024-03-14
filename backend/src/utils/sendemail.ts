import nodemailer from 'nodemailer';

// Utiliser des variables d'environnement pour les informations sensibles
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

/**
 * Fonction générique pour envoyer des e-mails
 * 
 * @param to Adresse e-mail du destinataire
 * @param subject Sujet de l'e-mail
 * @param html Contenu HTML de l'e-mail
 */
export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
    });

    try {
        await transporter.sendMail({
            from: '"Ressources" <noreply@ressources.com>',
            to: to,
            subject: subject,
            html: html,
        });
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email : ${error}`);
    }
}

export async function sendValidationEmail(email: string, token: string): Promise<void> {
    const baseUrl = process.env.BASE_URL;
    const urlValidation = `${baseUrl}/validation?token=${token}`;
    const subject = 'Validation de votre compte';
    const html = `Veuillez cliquer sur ce lien pour valider votre compte : <a href="${urlValidation}">${urlValidation}</a>`;

    await sendEmail(email, subject, html);
}

export async function sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const baseUrl = process.env.BASE_URL;
    const urlReset = `${baseUrl}/reset-password?token=${token}`;
    const subject = 'Réinitialisation de votre mot de passe';
    const html = `Veuillez cliquer sur ce lien pour réinitialiser votre mot de passe : <a href="${urlReset}">${urlReset}</a>`;

    await sendEmail(email, subject, html);
}






