import { SIGN_UP } from "@/requests/user";
import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import Logo from "@/components/atoms/logo";
import { Alert } from "react-bootstrap";
import { checkPasswords, checkEmail } from "@/utils/checkInput";
import Image from "next/image";
import Link from "next/link";

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
            <Image
              src="/assets/sharing.svg"
              alt="sharing"
              width={130}
              height={130}
            ></Image>
            <p className="title mt-3">
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
                <Link href="/sign-in" className="forgot_Password">
                  Connectez-vous dès maintenant !
                </Link>
              </p>
            </form>
          </>
        ) : (
          <>
            <Image
              src="/assets/mail_sent.svg"
              alt="mail-sent"
              width={130}
              height={130}
            ></Image>
            <span className="mt-3">Vérifiez votre boite mail !</span>
            <p className="title">
              Un mail de validation de compte a été envoyé sur votre adresse
              mail. Verifiez vos courriers indésirables.
            </p>
            <Link href="/sign-in" className="forgot_Password">
              Retour à la page d'accueil
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
