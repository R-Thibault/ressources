import React, { useState } from "react";
import Image from "next/image";
import LikeBtn from "../atoms/likeBtn";
import FavoriteBtn from "../atoms/favoriteBtn";
import Avatar from "../atoms/avatar";
import { RessourceType } from "@/types/ressources.types";
import { UserType } from "@/types/user.types";

export type RessourceCardProps = {
  ressource: RessourceType;
};

export type UserProps = {
  user: UserType;
};

export default function RessourceCard(
  props: RessourceCardProps
): React.ReactNode {
  const { ressource } = props;

  const [ressourceImageSrc, setRessourceImageSrc] = useState<string>(
    ressource?.image_id?.path.includes("://")
      ? ressource.image_id.path
      : `http://localhost:4000/files/${ressource?.image_id?.path.replace(
          "/app/upload/",
          ""
        )}`
  );


  return (
    <>
      <div className="card card-custom mb-3" style={{ borderRadius: 30 }}>
        <div className="d-flex flex-row justify-content-between align-items-center px-4">
          <Avatar
            user={ressource.created_by_user}
            date={ressource.created_at as Date}
          />
          <button className="card_header_btn">
            <i className="bi bi-three-dots"></i>
          </button>
        </div>
        <div>
          <Image
            unoptimized
            className="img-fluid shadow-sm"
            width={450}
            height={450}
            alt="jaky nackos"
            priority
            src={ressourceImageSrc}
            onErrorCapture={() => {
              setRessourceImageSrc("/assets/avatars/no-image.png");
            }}
          />
        </div>
        <div className="card-body pb-5">
          <div className="d-flex gap-1">
          </div>
          <h5 className="card-title pt-2 title">{ressource.title}</h5>
          {ressource.link_id && (
            <a href={ressource.link_id.url} target="_blank" rel="noopener noreferrer">
              <i className="bi bi-link"></i>
            </a>
          )}
        {ressource.file_id && (
            <a
              href={`http://localhost:4000/download/${ressource.file_id.path.replace("/app/upload/ressources/", "")}`}
              download={ressource.file_id.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-file-earmark-arrow-down"></i> {ressource.file_id.title}
            </a>
          )}
          <p className="card-text description">{ressource.description}</p>
        </div>
        <div className="d-flex gap-2 card_bottom_buttons_container">
          <LikeBtn className={"bi bi-hand-thumbs-up-fill"} />
          <FavoriteBtn className={"bi bi-star-fill"} />
        </div>
      </div>
    </>
  );
}
