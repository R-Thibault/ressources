import { SIGN_UP } from "@/requests/user";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Logo from "@/components/atoms/logo";
import { Alert } from "react-bootstrap";

export default function SignUp(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const [failed, setFailed] = useState(false);

  const router = useRouter();

  const [signUp, { data, error }] = useMutation<{ id: number; email: string }>(
    SIGN_UP,
    {
      variables: {
        data: {
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname,
          isTest: false,
        },
      },
    }
  );

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setFailed(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await signUp();
      /*   if (!error) {
        router.replace("/sign-in");
      } */
    } catch (error) {
      setFailed(true);
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
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {failed && (
                <Alert className="full_width" variant={"danger"}>
                  Une erreur est survenue
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
