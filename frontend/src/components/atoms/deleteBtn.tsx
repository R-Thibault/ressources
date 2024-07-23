import React from "react";

type BtnProps = {
    onClick: () => void;
};

export default function DeleteBtn({ onClick }: BtnProps)  {
  return (
    <button type="button" className="btn_delete" onClick={onClick}>
        <i className="bi bi-trash"></i>
    </button>
  );
}
