import { MY_PROFILE, SIGN_IN } from "@/Request/user";
import Layout, { LayoutProps } from "@/components/organisms/layout";
import SignStyles from "@/styles/Sign.module.css";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SignIn(): React.ReactNode {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("superPassword");
  const router = useRouter();

  const [signIn, { error }] = useMutation<{ id: number; email: string }>(
    SIGN_IN,
    {
      variables: {
        data: {
          email: email,
          password: password,
        },
      },
      refetchQueries: [MY_PROFILE],
    }
  );

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await signIn();
      console.log(response)
      if (!error) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

   // Gestionnaire pour le clic sur "Mot de passe oublié"
   const handleForgotPasswordClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); 
    router.push("/request-reset-password"); 
  };

  return (
    <div className={SignStyles.container}>
      <span className={SignStyles.logo}>RESSOURCES</span>
      <p className={SignStyles.paragraphe}>Team up and share</p>
      <form className={SignStyles.form} onSubmit={(e) => submitForm(e)}>
        <input
          className={SignStyles.input}
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={SignStyles.input}
          type="password"
          value={password}
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={SignStyles.button} type="submit">
          Se connecter
        </button>
         <a href="/request-password-reset" onClick={handleForgotPasswordClick} className={SignStyles.forgotPassword}>
          Mot de passe oublié
        </a>
      </form>
    </div>
  );
}
