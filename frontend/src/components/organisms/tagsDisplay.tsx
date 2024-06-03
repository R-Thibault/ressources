import React from "react";
import { TagType } from "@/types/tag.types";

export default function TagsDisplay(props: {
  tags: TagType[];
  selectedTags: TagType[];
  onSelectTag: (item: TagType) => void;
}) {
  function addSelectedTag(tag: TagType) {
    props.onSelectTag(tag);
  }

  return (
    <div className="tag_container">
      {props.tags?.map((item) => (
        <label key={item.id} htmlFor={item.name}>
          <input
            className="tag_input"
            name={item.name}
            id={item.name}
            type="checkbox"
            onChange={() => addSelectedTag(item)}
            checked={
              props.selectedTags.find((tag) => tag === item) ? true : false
            }
          />
          <span className="tag_text">{item.name}</span>
        </label>
      ))}
    </div>
  );
}
