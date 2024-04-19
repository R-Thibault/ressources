import React from "react";
import Tag from "../atoms/tag";

export default function TagsDisplay() {
  return (
    <div className="tag_container">
      <Tag name={"randonée"} />
      <Tag name={"montagne"} />
      <Tag name={"paysage"} />
    </div>
  );
}
