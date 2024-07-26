import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "../requests/user";
import { checkPasswords } from "@/utils/checkInput";
import { Alert } from "react-bootstrap";
import Logo from "@/components/atoms/logo";
import Image from "next/image";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Ajout d'un état pour stocker le message d'erreur
  const [successMessage, setSuccessMessage] = useState("");

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    variables: { token, newPassword, confirmNewPassword },
    onCompleted: () => {
      setSuccessMessage(
        "Votre mot de passe a été réinitialisé avec succès! Vous allez être redirigé sur la page de connexion."
      );
      setTimeout(() => router.push("/sign-in"), 6000);
    },
    onError: (error) => {
      // Personnalisation du message d'erreur en fonction de son contenu
      if (error.message.includes("Token expired")) {
        setErrorMessage(
          "Votre lien de réinitialisation a expiré. Veuillez demander un nouveau lien."
        );
      } else if (error.message.includes("User not found")) {
        setErrorMessage("L'utilisateur ne correspond pas.");
      } else {
        setErrorMessage(
          "Une erreur inattendue est survenue. Veuillez réessayer."
        );
      }
      console.error("An unexpected error occurred:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const validPassword = checkPasswords(newPassword, confirmNewPassword);
    if (validPassword.result) {
      resetPassword();
    } else {
      setErrorMessage(validPassword.errorMessage);
    }
  };

  return (
    <div className="container_signin">
      <Logo className={"menu_white_logo"} link="/sign-up" />
      <div className="signin_wrapper">
        <Image
          src="/assets/sharing.svg"
          alt="sharing"
          width={130}
          height={130}
        ></Image>
        <span className="mt-3">Réinitialisation de votre mot de passe</span>
        <p className="title">Renseignez votre nouveau mot de passe</p>
        <form
          onSubmit={handleSubmit}
          className="w-100 d-flex flex-column justify-content-center align-items-center"
        >
          <input
            className="input"
            type="password"
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Confirmation nouveau mot de passe"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          {loading && (
            <Alert className="full_width" variant={"light"}>
              Réinitialisation en cours...
            </Alert>
          )}
          {errorMessage !== "" && (
            <Alert className="full_width" variant={"danger"}>
              {errorMessage}
            </Alert>
          )}
          {successMessage !== "" && (
            <Alert className="full_width" variant={"success"}>
              {successMessage}
            </Alert>
          )}
          <button
            className="btn_primary menu_button_add_group"
            type="submit"
            disabled={loading}
          >
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
}
