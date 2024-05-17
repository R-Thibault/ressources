import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { RESEND_VALIDATION_EMAIL } from "../requests/user";
import { useRouter } from "next/router";

export default function ResendValidationEmailPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resendValidationEmail, { loading }] = useMutation(
    RESEND_VALIDATION_EMAIL
  );
  const router = useRouter();

  const handleResendEmailClick = async () => {
    try {
      await resendValidationEmail({ variables: { email } });
      setMessage(
        "Un nouvel email de validation a été envoyé. Veuillez vérifier votre boîte de réception."
      );
    } catch (error) {
      setMessage(
        "Erreur lors de la tentative de renvoi l'email. Veuillez réessayer."
      );
    }
  };

  const handleBack = () => {
    router.push("/sign-up");
  };

  return (
    <div className="container_signin">
      <p>Votre lien de validation a expiré</p>

      <input
        className="input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Entrez votre adresse email"
      />
      <button
        className="btn_primary menu_button_add_group"
        onClick={handleResendEmailClick}
        disabled={loading}
      >
        Renvoyer l'email de validation
      </button>
      {message && <p>{message}</p>}
      <button
        className="btn_primary menu_button_add_group"
        onClick={handleBack}
      >
        Retour page d'acceuil
      </button>
    </div>
  );
}
