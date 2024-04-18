import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { VALIDATE_ACCOUNT } from "../Request/user";
import Logo from "@/components/atoms/logo";

export default function ValidateAccountPage() {
  const router = useRouter();

  // Extraction du token de l'URL
  const { token } = router.query;

  const [validateAccount, { data, loading, error }] = useMutation(
    VALIDATE_ACCOUNT,
    {
      variables: { token },
      onCompleted: () => {
        setTimeout(() => router.push("/sign-in"), 3000);
      },
      onError: (error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("User not found")) {
          setTimeout(() => router.push("/sign-up"), 3000); // Rediriger vers la page d'inscription
        } else if (errorMessage.includes("Token expired")) {
          router.push("/token-expired"); // Rediriger vers la page de renvoi de mail
        } else {
          console.error("An unexpected error occurred:", error.message);
        }
      },
    }
  );

  useEffect(() => {
    if (token) {
      validateAccount({
        variables: { token },
      });
    }
  }, [token, validateAccount]);

  return (
    <div className="container_signin">
      <Logo className={"menu_white_logo"} link="/sign-up" />
      <div className="signin_wrapper">
        {loading && <span>Validation en cours...</span>}
        {error && (
          <span>Erreur lors de la validation du compte: {error.message}</span>
        )}
        {data && <span>Votre compte a été validé avec succès!</span>}
      </div>
    </div>
  );
}
