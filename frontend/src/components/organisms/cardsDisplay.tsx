import React from "react";
import RessourceCard from "../molecules/ressourceCard";
import { RessourceType } from "@/types/ressources.types";

export type RessourceProps = {
  ressources: RessourceType[];
};

export default function CardsDisplay(props: RessourceProps): React.ReactNode {
  return (
    <div className="cards-container">
      {props.ressources.map((ressource: RessourceType) => (
        <RessourceCard key={ressource.id} ressource={ressource} />
      ))}
    </div>
  );
}
