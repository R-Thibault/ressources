import React from "react";
import Tag from "../atoms/tag";
import LikeBtn from "../atoms/likeBtn";
import Avatar from "../atoms/avatar";

export default function ressourceCard() {
  return (
    <>
      <div className="card card-width">
        <Avatar />
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
          <h5 className="card-title pt-2">La montage ça vous gagne</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="d-flex gap-2 like_content">
            <LikeBtn className={"bi bi-hand-thumbs-up-fill"} />
            <LikeBtn className={"bi bi-star-fill"} />
          </div>
        </div>
      </div>
    </>
  );
}
