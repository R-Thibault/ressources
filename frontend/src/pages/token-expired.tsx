import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RESEND_VALIDATION_EMAIL } from '../Request/user';
import { useRouter } from 'next/router';
import SignStyles from "@/styles/Sign.module.css";

export default function ResendValidationEmailPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resendValidationEmail, { loading, error }] = useMutation(RESEND_VALIDATION_EMAIL);
  const router = useRouter();

  const handleResendEmailClick = async () => {
    try {
      await resendValidationEmail({ variables: { email } });
      setMessage('Un nouvel email de validation a été envoyé. Veuillez vérifier votre boîte de réception.');
    } catch (error) {
      setMessage('Erreur lors de la tentative de renvoi l\'email. Veuillez réessayer.');
    }
  };

  const handleBack = () => {
    router.push('/sign-up'); 
  };

  return (
    <div  className={SignStyles.container}>
        <p>Votre lien de validation a expiré</p>
         
      <input
        className={SignStyles.input}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Entrez votre adresse email"
      />
      <button 
        className={SignStyles.button} 
        onClick={handleResendEmailClick} disabled={loading}>
        Renvoyer l'email de validation
      </button>
      {message && <p>{message}</p>}
      <button 
        className={SignStyles.button} 
        onClick={handleBack}>Retour page d'acceuil</button>
    </div>
  );
}