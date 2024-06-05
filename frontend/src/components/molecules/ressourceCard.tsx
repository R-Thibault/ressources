import React from "react";
import CardTag from "../atoms/cardTag";
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

  return (
    <>
      <div className="card card-custom mb-3" style={{ borderRadius: 30 }}>
        <div className="d-flex flex-row justify-content-between align-items-center px-4">
          <Avatar
            user={ressource.created_by_user}
            date={ressource.created_at}
          />
          <button className="card_header_btn">
            <i className="bi bi-three-dots"></i>
          </button>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt=""
            className="img-fluid shadow-sm "
          />
        </div>
        <div className="card-body pb-5">
          <div className="d-flex gap-1">
            <CardTag name={"randonée"} />
            <CardTag name={"montagne"} />
            <CardTag name={"paysage"} />
          </div>
          <h5 className="card-title pt-2 title">{ressource.title}</h5>
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
