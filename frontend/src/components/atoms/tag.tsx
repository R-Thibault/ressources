import { TagType } from "@/types/extra.types";
import React from "react";

export default function tag(props: TagType) {
  return <span className="tag">{`#${props.name}`}</span>;
}
