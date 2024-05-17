import React from "react";
import Tag from "../atoms/tag";
import LikeBtn from "../atoms/likeBtn";
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
      <div className="card card-width">
        <Avatar user={ressource.created_by_user} />
        <div>
          <img
            src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
            alt=""
            className="img-fluid shadow-sm "
          />
        </div>
        <div className="card-body">
          <div className="d-flex gap-1">
            <Tag name={"randonée"} />
            <Tag name={"montagne"} />
            <Tag name={"paysage"} />
            ...
          </div>
          <h5 className="card-title pt-2">{ressource.title}</h5>
          <p className="card-text">{ressource.description}</p>
          <div className="d-flex gap-2 like_content">
            <LikeBtn className={"bi bi-hand-thumbs-up-fill"} />
            <LikeBtn className={"bi bi-star-fill"} />
          </div>
        </div>
      </div>
    </>
  );
}
