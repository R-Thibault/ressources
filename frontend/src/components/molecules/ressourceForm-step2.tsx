import Form from "react-bootstrap/Form";
import "react-circular-progressbar/dist/styles.css";
import { FormEvent, useState } from "react";
import { Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { FileType } from "@/types/file.types";
import { CREATE_RESSOURCE } from "@/requests/ressources";
import { LinkType } from "@/types/link.types";

export default function RessourcesFormStep2(props: {
  handleSubmit(value: boolean): void;
  type: string;
  entity: FileType | null | LinkType;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [createNewRessource, { error }] = useMutation<{
    id: number;
    title: string;
    description: string;
  }>(CREATE_RESSOURCE, {
    variables: {
      data: {
        title: title,
        description: description,
        entityId: Number(props.entity?.id),
        type: props.type,
      },
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createNewRessource();
      if (!error) {
        props.handleSubmit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      className="d-flex justify-content-center align-items-center flex-column"
      onSubmit={(e) => onSubmit(e)}
    >
        <>
          <Form.Group className="mb-3 w-100">
            <Form.Label>Titre de votre ressource</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="titre de votre ressource"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3 w-100">
            <Form.Label>Description de votre ressource</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Description de votre ressource"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </Form.Group>
        </>

      <div className="button_container">
        <button className="btn_primary" type="submit">
          <i className="bi bi-plus-circle" />
          <span>Créer une nouvelle ressource</span>
        </button>
      </div>
      {error && (
        <Alert variant={"danger"}>
          Une erreur est survenue. Veuillez réessayer.
        </Alert>
      )}
    </Form>
  );
}
