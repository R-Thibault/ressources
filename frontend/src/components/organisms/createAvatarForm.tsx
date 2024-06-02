import { FormEvent, useState } from "react";
import { useQuery } from "@apollo/client";
import { UserType } from "@/types/user.types";
import { MY_PROFILE } from "@/requests/user";
import axios from "axios";
import { API_URL } from "@/config/config";
import router from "next/router";
import Image from "next/image";

export default function CreateAvatarForm() {
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageData, setImageData] = useState();
  const [image, setImage] = useState<string | null>(null);
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleImageUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = document.getElementById("imageUpload") as HTMLInputElement;
    if (input && input.files) {
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
      const result = await axios.post(`${API_URL}/upload/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.status >= 200 && result.status < 300) {
        router.reload();
      } else {
        setImageError(
          "Une erreur est survenue pendant le chargement de votre image, veuillez contactez un administrateur"
        );
      }
    } else {
      setImageError(
        "Une erreur est survenue pendant le chargement de votre image, veuillez contactez un administrateur"
      );
    }
  };

  return (
    <>
      <div className="title">
        <span>Modifier votre photo de profile</span>
      </div>
      <div className="avatar_form_popup">
        <form onSubmit={(e) => handleImageUpload(e)} className="avatar_form">
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="imageUpload"
              accept="image/*"
              onChange={onImageChange}
            />
          </div>
          <Image
            className="rounded-circle mx-auto my-3"
            height={150}
            width={150}
            alt="jaky nackos"
            priority
            src={image || "/assets/avatars/no-image.png"} // Provide a default value for the image variable
            onErrorCapture={() => {
              setImage("/assets/avatars/no-image.png");
            }}
          />
          {imageError && <span className="image_error">{imageError}</span>}
          <button className="btn btn-primary mx-auto my-3 ">Valider</button>
        </form>
      </div>
    </>
  );
}
