import Form from "react-bootstrap/Form";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FormEvent, useState } from "react";
import { Alert } from "react-bootstrap";
import axios, { AxiosProgressEvent } from "axios";
import { API_URL } from "@/config/config";
import { FileType } from "@/types/file.types";

export default function RessourcesFormStep1(props: {
  handleSelectRessourceType(value: string): void;
  handleChangeFormStep(step: number, entityId: FileType): void;
  type: string;
  userId: number | undefined;
}) {
  const [link, setLink] = useState<string>("");
  const [file, setFile] = useState<FileList>();
  const [error, setError] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setError(false);
      setIsUploading(true);
      const formData = new FormData();
      if (file) {
        formData.append("file", file[0]);
        formData.append("userId", `${props.userId}`);
      }

      const result = await axios.post(`${API_URL}api/upload/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress(progressEvent: AxiosProgressEvent) {
          setProgress(
            Math.round((100 * progressEvent.loaded) / progressEvent.total)
          );
        },
      });
      if (result.status === 200) {
        props.handleChangeFormStep(2, result.data);
      }
    } catch (error) {
      setError(true);
      setIsUploading(false);
    }
  };

  return (
    <Form
      className="d-flex justify-content-center align-items-center flex-column"
      onSubmit={(e) => handleSubmit(e)}
    >
      {!isUploading && (
        <Form.Group className="mb-3">
          <div
            key={`inline-radio`}
            className="mb-3 d-flex justify-content-center"
          >
            <Form.Check
              inline
              label="Lien"
              name="ressource"
              type="radio"
              id="link"
              onChange={() => props.handleSelectRessourceType("link")}
              checked={props.type === "link"}
            />
            <Form.Check
              inline
              label="Fichier"
              name="ressource"
              type="radio"
              id="file"
              onChange={() => props.handleSelectRessourceType("file")}
              checked={props.type === "file"}
            />
          </div>
        </Form.Group>
      )}
      {props.type === "link" ? (
        <Form.Group className="mb-3 w-100">
          <Form.Label>Votre lien</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="https://www.google.com"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </Form.Group>
      ) : isUploading ? (
        <div className="w-25 h-25 mb-5">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textColor: "#198754",
              pathColor: "#198754",
              trailColor: "#198754",
            })}
          />
        </div>
      ) : (
        <Form.Control type="file" size="sm" onChange={selectFile} />
      )}
      {!isUploading && (
        <div className="button_container">
          <button
            className="btn_primary"
            disabled={file === undefined}
            type="submit"
          >
            <i className="bi bi-plus-circle" />
            <span>Etape Suivante</span>
          </button>
        </div>
      )}
      {error && (
        <Alert variant={"danger"}>
          Une erreur est survenue. Veuillez réessayer.
        </Alert>
      )}
    </Form>
  );
}
