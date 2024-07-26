import { useState } from "react";
import { useMutation } from "@apollo/client";
import { checkEmail } from "@/utils/checkInput";
import { REQUEST_PASSWORD_RESET } from "../requests/user";
import Logo from "@/components/atoms/logo";
import { Alert } from "react-bootstrap";
import Image from "next/image";

export default function ResetPasswordRequestPage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [requestPasswordReset, { data, loading }] = useMutation(
    REQUEST_PASSWORD_RESET
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage("");
    e.preventDefault();
    const validEmail = checkEmail(email);
    try {
      if (validEmail) {
        const response = await requestPasswordReset({ variables: { email } });
        if (response) {
          setEmail("");
        }
      } else {
        setErrorMessage("Merci de renseigner un email valide!");
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer!");
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
        <p className="title">Renseignez votre adresse email</p>
        <form
          onSubmit={handleSubmit}
          className="w-100 d-flex flex-column justify-content-center align-items-center"
        >
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
            required
          />
          {errorMessage != "" && (
            <Alert className="full_width" variant={"danger"}>
              {errorMessage}
            </Alert>
          )}
          {data && (
            <Alert className="full_width" variant={"success"}>
              Vérifiez votre boîte mail pour le lien de réinitialisation.
            </Alert>
          )}
          {loading && (
            <Alert className="full_width" variant={"light"}>
              Envoi en cours...
            </Alert>
          )}
          <button
            className="btn_primary menu_button_add_group"
            type="submit"
            disabled={loading}
          >
            Envoyer le lien de réinitialisation
          </button>
        </form>
      </div>
    </div>
  );
}
