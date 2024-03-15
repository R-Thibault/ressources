import { LikeType } from "@/types/extra.types";
import React from "react";

export default function likeBtn(props: LikeType) {
  return (
    <button type="button" className="btn_like">
      <i className={props.className}></i>
    </button>
  );
}
