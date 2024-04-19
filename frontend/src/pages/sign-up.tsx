import { SIGN_UP } from "@/requests/user";
import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import Logo from "@/components/atoms/logo";
import { Alert } from "react-bootstrap";
import { checkPasswords, checkEmail } from "@/utils/checkInput";

export default function SignUp(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [signUp, { data }] = useMutation<{ id: number; email: string }>(
    SIGN_UP,
    {
      variables: {
        data: {
          email,
          password,
          confirmPassword,
          firstname,
          lastname,
          isTest: false,
        },
      },
    }
  );

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setErrorMessage("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const validPassword = checkPasswords(password, confirmPassword);
      const validEmail = checkEmail(email);

      if (validEmail) {
        if (validPassword.result) {
          await signUp();
        } else {
          setErrorMessage(validPassword.errorMessage);
        }
      } else {
        setErrorMessage("Merci de renseigner un email valide!");
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer!");
    }
  }

  return (
    <div className="container_signin">
      <Logo className={"menu_white_logo"} link="/sign-up" />

      <div className="signin_wrapper">
        {!data ? (
          <>
            <span>Inscription</span>
            <p className="title">
              Inscrivez-vous dès maintenant en remplissant le formulaire
              ci-dessous
            </p>
            <form className="form" onSubmit={(e) => submitForm(e)}>
              <input
                className="input"
                required
                type="text"
                value={lastname}
                placeholder="Nom"
                onChange={(e) => setLastname(e.target.value)}
              />
              <input
                className="input"
                type="text"
                required
                value={firstname}
                placeholder="Prénom"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                className="input"
                required
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                required
                type="password"
                value={password}
                placeholder="mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="input"
                required
                type="password"
                value={confirmPassword}
                placeholder="confirmation mot de passe"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errorMessage !== "" && (
                <Alert className="full_width" variant={"danger"}>
                  {errorMessage}
                </Alert>
              )}
              <button
                className="btn_primary menu_button_add_group"
                type="submit"
              >
                Créer un compte
              </button>
              <p className="signup_link">
                Vous avez déjà un compte ?{" "}
                <a href="/sign-in" className="forgot_Password">
                  Connectez-vous dès maintenant !
                </a>
              </p>
            </form>
          </>
        ) : (
          <>
            <span>Vérifiez votre boite mail !</span>
            <p className="title">
              Un mail de validation de compte a été envoyé sur votre adresse
              mail. Verifiez vos courriers indésirables.
            </p>
            <a href="/sign-in" className="forgot_Password">
              Retour à la page d'accueil
            </a>
          </>
        )}
      </div>
    </div>
  );
}
