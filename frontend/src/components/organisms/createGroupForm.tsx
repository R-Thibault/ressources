import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_GROUP, GET_MY_GROUPS } from "@/requests/group";

export default function CreateGroupForm(props: {
  onClose(value: boolean): void;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [createNewGroup, { error }] = useMutation<{
    name: string;
    description: string;
  }>(CREATE_GROUP, {
    variables: {
      data: {
        name: title,
        description: description,
      },
    },
    refetchQueries: [GET_MY_GROUPS],
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createNewGroup();
      if (!error) {
        props.onClose(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="title">
        <span>Créer un nouveau groupe</span>
      </div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nom du groupe"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows={3}
            placeholder="Description du groupe"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Form.Group>
        <div className="button_container">
          <button className="btn_primary" type="submit">
            <i className="bi bi-plus-circle" />
            <span>Créer un nouveau groupe</span>
          </button>
        </div>
        {error && (
          <Alert variant={"danger"}>
            Une erreur est survenue. Veuillez réessayer.
          </Alert>
        )}
      </Form>
    </>
  );
}
