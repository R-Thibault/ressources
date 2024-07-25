import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_RESSOURCES_FROM_ONE_USER,
  GET_RESSOURCES_BY_GROUP_ID,
  UPDATE_RESSOURCE,
} from "@/requests/ressources";
import { RessourceType } from "@/types/ressources.types";
import { Form, Alert } from "react-bootstrap";
import Image from "next/image";
import Avatar from "../atoms/avatar";
import axiosInstance from "@/lib/axiosInstance";
import { UserType } from "@/types/user.types";
import { MY_PROFILE } from "@/requests/user";
import { API_URL } from "@/config/config";

type UpdateRessourceFormProps = {
  ressource: RessourceType;
  onClose: () => void;
};

export default function EditRessourceForm({
  ressource,
  onClose,
}: UpdateRessourceFormProps) {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState(ressource.title);
  const [description, setDescription] = useState(ressource.description);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageObject, setImageObject] = useState<string | null>(null);
  const [updateRessource, { error: errorUpdateRessource }] = useMutation(
    UPDATE_RESSOURCE,
    {
      refetchQueries: [
        GET_ALL_RESSOURCES_FROM_ONE_USER,
        GET_RESSOURCES_BY_GROUP_ID,
      ],
    }
  );
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
  const ressourceImage = ressource.image_id?.path.includes("://")
    ? ressource.image_id?.path
    : `${API_URL}/files${ressource.image_id?.path.replace("/app/upload/", "")}`;
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const input = document.getElementById("imageUpload") as HTMLInputElement;

      if (input && input.files && input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("file", file);
        if (dataUser && dataUser.item) {
          formData.append("userId", String(dataUser.item.id));
          if (ressource.image_id) {
            formData.append("previousImageId", String(ressource?.image_id?.id));
            formData.append("ressourceId", String(ressource.id));
          }
        } else {
          setImageError(
            "Une erreur est survenue pendant le chargement de votre image, veuillez contactez un administrateur"
          );
        }

        const result = await axiosInstance.post(
          "/upload/updateRessourceImage",
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
            "Une erreur est survenue pendant la modification de votre ressource, veuillez contactez un administrateur"
          );
        }
      } else {
        await handleUpdateRessource();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateRessource = async () => {
    try {
      await updateRessource({
        variables: {
          id: ressource.id,
          data: {
            title: title,
            description: description,
            imageId: imageObject,
          },
        },
      });
      if (!errorUpdateRessource) {
        onClose();
      } else {
        console.error(errorUpdateRessource);
        setImageError(
          "Une erreur est survenue pendant la modification de votre ressource, veuillez contactez un administrateur"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  useEffect(() => {
    if (imageObject) {
      handleUpdateRessource();
    }
  }, [imageObject]);
  return (
    <>
      <div className="title">
        <span>Modifier votre ressource </span>
      </div>
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
              <span>Modifier</span>
            </button>
          </div>
          {errorUpdateRessource && (
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
              src={
                image ? image : ressourceImage || "/assets/avatars/no-image.png"
              }
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
