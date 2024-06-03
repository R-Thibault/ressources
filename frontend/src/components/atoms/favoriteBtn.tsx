import { LikeType } from "@/types/extra.types";
import React from "react";

export default function favoriteBtn(props: LikeType) {
  return (
    <button type="button" className="btn_favorite">
      <i className={props.className}></i>
    </button>
  );
}
