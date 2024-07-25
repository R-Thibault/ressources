import Form from "react-bootstrap/Form";
import "react-circular-progressbar/dist/styles.css";
import { FormEvent, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { FileType } from "@/types/file.types";
import {
  CREATE_RESSOURCE,
  GET_ALL_RESSOURCES_FROM_ONE_USER,
  GET_RESSOURCES_BY_GROUP_ID,
} from "@/requests/ressources";
import { LinkType } from "@/types/link.types";
import axiosInstance from "@/lib/axiosInstance";
import { UserType } from "@/types/user.types";
import { MY_PROFILE } from "@/requests/user";
import Image from "next/image";
import Avatar from "../atoms/avatar";

export default function RessourcesFormStep2(props: {
  handleSubmit(value: boolean): void;
  type: string;
  entity: FileType | null | LinkType;
  groupId?: number;
}) {
  const [image, setImage] = useState<string | null>(null);
  const [imageObject, setImageObject] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
  const [createNewRessource, { error }] = useMutation<{
    id: number;
    title: string;
    description: string;
    imageId: string;
  }>(CREATE_RESSOURCE, {
    refetchQueries: [
      props.groupId
        ? GET_RESSOURCES_BY_GROUP_ID
        : GET_ALL_RESSOURCES_FROM_ONE_USER,
    ],
  });
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const createRessource = async () => {
    try {
      await createNewRessource({
        variables: {
          data: {
            title: title,
            description: description,
            entityId: Number(props.entity?.id),
            type: props.type,
            groupId: props.groupId ? props.groupId : null,
            imageId: imageObject,
          },
        },
      });
      if (!error) {
        props.handleSubmit(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const input = document.getElementById("imageUpload") as HTMLInputElement;

      if (input && input.files && input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("file", file);
        if (dataUser && dataUser.item) {
          formData.append("userId", String(dataUser.item.id));
        } else {
          setImageError(
            "Une erreur est survenue pendant le chargement de votre image, veuillez contactez un administrateur"
          );
        }
        const result = await axiosInstance.post(
          "/upload/ressourceImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (result.status >= 200 && result.status < 300) {
          setImageObject(result.data.id);
        } else {
          setImageError(
            "Une erreur est survenue pendant le chargement de votre image, veuillez contactez un administrateur"
          );
        }
      } else {
        await createRessource();
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (imageObject) {
      createRessource();
    }
  }, [imageObject]);

  return (
    <>
      <div className="custom_form ">
        <Form
          className="d-flex justify-content-center align-items-center flex-column"
          onSubmit={(e) => onSubmit(e)}
        >
          <>
            <Form.Group className="mb-3 w-100">
              <Form.Label>Image de votre ressource</Form.Label>
              <input
                type="file"
                className="form-control"
                id="imageUpload"
                accept="image/*"
                onChange={onImageChange}
              />
            </Form.Group>
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
          {imageError && <span className="image_error">{imageError}</span>}
          <div className="button_container ">
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

        <div
          className="card card_custom_display mb-3"
          style={{ borderRadius: 30 }}
        >
          <div className="d-flex flex-row justify-content-between align-items-center px-4">
            <Avatar
              user={dataUser?.item as UserType}
              date={new Date().toISOString()}
            />
          </div>
          <div>
            <Image
              unoptimized
              className="img-fluid shadow-sm"
              width={275}
              height={100}
              alt={title}
              priority
              src={image || "/assets/avatars/no-image.png"} // Provide a default value for the image variable
              onErrorCapture={() => {
                setImage("/assets/avatars/no-image.png");
              }}
            />
          </div>
          <div className="card-body pb-5">
            <div className="d-flex gap-1"></div>
            <h5 className="card-title pt-2 title">{title}</h5>

            <p className="card-text description">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
