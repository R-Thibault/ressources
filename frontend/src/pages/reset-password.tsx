import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../Request/user';
import SignStyles from "@/styles/Sign.module.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');

  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD, {
    variables: { token, newPassword },
    onCompleted: () => {
      setTimeout(() => router.push('/sign-in'), 3000);
    },
    onError: (error) => {
      console.error("An unexpected error occurred:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword();
  };

  return (
    <div className={SignStyles.container}>
      <form onSubmit={handleSubmit}>
        <input
          className={SignStyles.input}
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}      
          required
        />
        <button  className={SignStyles.button} type="submit" disabled={loading}>Réinitialiser le mot de passe</button>
      </form>
      {loading && <p>Réinitialisation en cours...</p>}
      {error && <p>Erreur lors de la réinitialisation du mot de passe : {error.message}</p>}
      {data && <p>Votre mot de passe a été réinitialisé avec succès !</p>}
    </div>
  );
}
