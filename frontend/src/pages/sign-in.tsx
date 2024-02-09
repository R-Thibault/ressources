import { MY_PROFILE, SIGN_IN } from "@/Request/user";
import Layout, { LayoutProps } from "@/components/organisms/layout";
import SignStyles from "@/styles/Sign.module.css";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SignIn(props: LayoutProps): React.ReactNode {
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
      if (!error) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={"S'inscrire"}>
      <div className={SignStyles.container}>
        <span className={SignStyles.logo}>THE GOOD CORNER</span>
        <h3>Connexion</h3>
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
          <button className={SignStyles.button} type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </Layout>
  );
}
