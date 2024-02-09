import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RESEND_VALIDATION_EMAIL } from '../Request/user';
import { useRouter } from 'next/router';

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
      setMessage('Erreur lors de la tentative de renvoi de l\'email. Veuillez réessayer.');
    }
  };

  // Gérer pour le retour sur la page de connexion ou d'inscription
  const handleBack = () => {
    router.push('/'); // faire en fonction de la page qu'on veut mettre
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Entrez votre adresse email"
      />
      <button onClick={() =>handleResendEmailClick} disabled={loading}>
        Renvoyer l'email de validation
      </button>
      {message && <p>{message}</p>}
      <button onClick={() =>handleBack}>Retour</button>
    </div>
  );
}