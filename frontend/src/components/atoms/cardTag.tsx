import { TagType } from "@/types/extra.types";
import React from "react";

export default function CardTag(props: TagType) {
  return <span className="card-tag">{`#${props.name}`}</span>;
}
