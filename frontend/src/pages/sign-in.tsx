import React, { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_IN, MY_PROFILE } from "@/Request/user";
import { useRouter } from "next/router";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    variables: { data: { email, password, isTest: false } },
    refetchQueries: [MY_PROFILE],
    onCompleted: () => router.replace("/"),
    onError: (error) => {
      if (error.message.includes("user not found")) {
        setErrorMessage("Utilisateur introuvable.");
      } else if (error.message.includes("user and password dont match")) {
        setErrorMessage("Utilisateur et mot de passe ne correspondent pas.");
      } else if (error.message.includes("account not validated")) {
        setErrorMessage("Le compte n'a pas encore été validé.");
      } else {
        setErrorMessage("Erreur lors de la connexion.");
      }
    },
  });

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialiser le message d'erreur
    signIn();
  };

  const handleForgotPasswordClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    router.push("/request-reset-password");
  };

  return (
    <div className="container_signin">
      <span className="logo">RESSOURCES</span>
      <p className="paragraphe">Team up and share</p>
      <form className="form" onSubmit={submitForm}>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn_primary" type="submit" disabled={loading}>
          Se connecter
        </button>
        <a onClick={handleForgotPasswordClick} className="forgot_Password">
          Mot de passe oublié
        </a>
      </form>
      {errorMessage && <p className="error_Message">{errorMessage}</p>}
    </div>
  );
}
