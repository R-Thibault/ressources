import { SIGN_UP } from "@/Request/user";
import Layout from "@/components/organisms/layout";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function SignUp(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");

  const [failed, setFailed] = useState(false);

  const router = useRouter();

  const [signUp, { error }] = useMutation<{ id: number; email: string }>(
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
      if (!error) {
        router.replace("/sign-in");
      }
    } catch (error) {
      setFailed(true);
    }
  }

  return (
    <Layout title={"S'inscrire"}>
      <div className="container_signin">
        <span className="logo">THE GOOD CORNER</span>
        <h3>Inscription</h3>
        <form className="form" onSubmit={(e) => submitForm(e)}>
          <input
            className="input"
            type="text"
            value={lastname}
            placeholder="Nom"
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            className="input"
            type="text"
            value={firstname}
            placeholder="Prénom"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            className="input"
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="input"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {failed && (
            <span className="error_Message">Une erreur est survenue</span>
          )}
          <button className="btn_primary menu_button_add_group" type="submit">
            Inscription
          </button>
        </form>
      </div>
    </Layout>
  );
}
