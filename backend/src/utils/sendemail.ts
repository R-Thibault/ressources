import nodemailer from 'nodemailer';

// Utiliser des variables d'environnement pour les informations sensibles
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const baseUrl = process.env.BASE_URL;


/**
 * 
 * @param email 
 * @param token 
 */
export async function sendValidationEmail(email: string, token: string): Promise<void> {
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

    const urlValidation = `${baseUrl}/validation?token=${token}`;

    try {
        await transporter.sendMail({
            from: '"Ressources" <noreply@ressources.com>',
            to: email,
            subject: 'Validation de votre compte',
            html: `Veuillez cliquer sur ce lien pour valider votre compte : <a href="${urlValidation}">${urlValidation}</a>`
        });
    } catch (error) {
        console.error(`Erreur lors de l'envoi de l'email : ${error}`);
        
    }
}


//export async function sendNotificationEmail(email: string, token: string): Promise<void> {
//    const transporter = nodemailer.createTransport({
//          service: "Gmail",
//          host: "smtp.gmail.com",
//          port: 465,
//          secure: true,
//          auth: {
//              user: emailUser,
//              pass: emailPass,
//          },
//    });

//    const urlValidation = `${baseUrl}/validation?token=${token}`;

//    try {
//        await transporter.sendMail({
//            from: '"Votre Site" <noreply@votresite.com>',
//            to: email,
//            subject: 'Validation de votre compte',
//            html: `Veuillez cliquer sur ce lien pour valider votre compte : <a href="${urlValidation}">${urlValidation}</a>`
//        });
//    } catch (error) {
//        console.error(`Erreur lors de l'envoi de l'email : ${error}`);
        
//    }
// }

//export async function sendInvitationEmail(email: string, token: string): Promise<void> {
//    const transporter = nodemailer.createTransport({
//          service: "Gmail",
//          host: "smtp.gmail.com",
//          port: 465,
//          secure: true,
//          auth: {
//              user: emailUser,
//              pass: emailPass,
//          },
//    });

//    const urlValidation = `${baseUrl}/validation?token=${token}`;

//    try {
//        await transporter.sendMail({
//            from: '"Votre Site" <noreply@votresite.com>',
//            to: email,
//            subject: 'Validation de votre compte',
//            html: `Veuillez cliquer sur ce lien pour valider votre compte : <a href="${urlValidation}">${urlValidation}</a>`
//        });
//    } catch (error) {
//        console.error(`Erreur lors de l'envoi de l'email : ${error}`);
        
//    }
// }




