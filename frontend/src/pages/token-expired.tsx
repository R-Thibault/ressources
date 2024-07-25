import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { RESEND_VALIDATION_EMAIL } from "../requests/user";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "react-bootstrap";

export default function ResendValidationEmailPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resendValidationEmail, { loading }] = useMutation(
    RESEND_VALIDATION_EMAIL
  );

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

  return (
    <div className="container_signin">
      <div className="signin_wrapper">
        <span className="title">Oups! </span>
        <Image
          src="/assets/access_denied.svg"
          alt="sharing"
          width={150}
          height={150}
          className="mt-2 mb-2"
        ></Image>
        <p className="mt-2 mb-4">
          Votre lien de validation a expiré. Merci de saisir votre email pour
          vous renvoyer un lien !
        </p>

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
        {message && (
          <Alert
            className="full_width"
            variant={message.includes("Erreur") ? "danger" : "success"}
          >
            {message}.
          </Alert>
        )}
        <Link href="/sign-in" className="forgot_Password">
          Retour à la page d'accueil
        </Link>
      </div>
    </div>
  );
}
