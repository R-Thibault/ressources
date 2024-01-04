import { SIGN_UP } from "@/Request/user";
import Layout, { LayoutProps } from "@/components/layout";
import SignStyles from "@/styles/Sign.module.css";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SignUp(props: LayoutProps): React.ReactNode {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  const router = useRouter();

  const [signUp, { error }] = useMutation<{ id: number; email: string }>(
    SIGN_UP,
    {
      variables: {
        data: {
          email: email,
          password: password,
        },
      },
    }
  );

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setFailed(false);
      const response = await signUp();
      if (!error) {
        router.replace("/sign-in");
      }
    } catch (error) {
      console.log(error);
      setFailed(true);
    }
  }

  return (
    <Layout title={"S'inscrire"}>
      <div className={SignStyles.container}>
        <span className={SignStyles.logo}>THE GOOD CORNER</span>
        <h3>Inscription</h3>
        <form className={SignStyles.form} onSubmit={(e) => submitForm(e)}>
          <input
            className={SignStyles.input}
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={SignStyles.input}
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {failed && (
            <span className={SignStyles.errorMessage}>
              Une erreur est survenue
            </span>
          )}
          <button className={SignStyles.button} type="submit">
            Inscription
          </button>
        </form>
      </div>
    </Layout>
  );
}
