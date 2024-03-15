import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET } from "../Request/user";
import SignStyles from "@/styles/Sign.module.css";

export default function ResetPasswordRequestPage() {
  const [email, setEmail] = useState("");
  const [requestPasswordReset, { data, loading, error }] = useMutation(
    REQUEST_PASSWORD_RESET
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await requestPasswordReset({ variables: { email } });
    } catch (error) {
      console.error(
        "Erreur lors de la demande de réinitialisation du mot de passe",
        error
      );
    }
  };

  return (
    <div className="container_signin">
      <span className="logo">RESSOURCES</span>
      <p className="paragraphe">Team up and share</p>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
          required
        />
        <button
          className="btn_primary menu_button_add_group"
          type="submit"
          disabled={loading}
        >
          Envoyer le lien de réinitialisation
        </button>
      </form>
      {loading && <p>Envoi en cours...</p>}
      {error && <p>Une erreur s'est produite : {error.message}</p>}
      {data && (
        <p>Vérifiez votre boîte mail pour le lien de réinitialisation.</p>
      )}
    </div>
  );
}
