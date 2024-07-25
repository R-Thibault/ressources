import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { checkEmail } from "@/utils/checkInput";
import { SEND_GROUP_INVITATION } from "@/requests/group";

export default function SharingGroupForm(props: {
  groupId: number;
  onClose(value: boolean): void;
}): React.ReactElement {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sendGroupInvitation, { error }] = useMutation(SEND_GROUP_INVITATION);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const validEmail = checkEmail(email);

      if (!validEmail) {
        setErrorMessage("Merci de renseigner un email valide!");
        return;
      }
      const result = await sendGroupInvitation({
        variables: {
          groupId: props.groupId,
          email: email,
        },
      });
      if (!error) {
        props.onClose(false);
      }
      if (result.errors) {
        console.error(
          "Erreur lors de l'envoi de l'invitation :",
          result.errors
        );
        setErrorMessage("Une erreur est survenue. Veuillez réessayer !");
        return;
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'invitation :", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer!");
    }
  };
  return (
    <>
      <div className="d-flex flex-column w-100 justify-content-center align-items-center">
        <i className="bi bi-person-fill-add modal_icon"></i>

        <div className="title">
          <span>Inviter des membres</span>
        </div>
        <p>Partager le groupe avec vos amis!</p>
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-column w-100 justify-content-center align-items-center"
        >
          <Form.Group className="mb-3 w-75">
            <Form.Label>Adresse mail</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Entrez l'adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <div className="button_container">
            <button className="btn_primary" type="submit">
              <i className="bi bi-plus-circle" />
              <span>Partager</span>
            </button>
          </div>
          {errorMessage && <Alert variant={"danger"}>{errorMessage}</Alert>}
        </Form>
      </div>
    </>
  );
}
