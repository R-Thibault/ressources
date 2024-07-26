import React from "react";
import RessourceCard from "../molecules/ressourceCard";
import { RessourceType } from "@/types/ressources.types";
import Image from "next/image";

export type RessourceProps = {
  ressources: RessourceType[];
};

export default function CardsDisplay(props: RessourceProps): React.ReactNode {
  return (
    <div className="cards-container">
      {props.ressources.length > 0 ? (
        props.ressources.map((ressource: RessourceType) => (
          <RessourceCard key={ressource.id} ressource={ressource} />
        ))
      ) : (
        <div className="w-100 d-flex justify-content-center align-items-center mt-5 flex-column">
          <Image
            className="image-fluid"
            src="/assets/no_ressources.svg"
            alt="no ressources"
            width={300}
            height={300}
          ></Image>
          <p className="no_ressources_text">
            Vous n'avez pas encore de ressources. Créez en une dès maintenant !
          </p>
        </div>
      )}
    </div>
  );
}
