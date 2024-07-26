import React from "react";

type BtnProps = {
  onClick: () => void;
};

export default function EditBtn({ onClick }: BtnProps) {
    return (
    <button type="button" className="btn_edit" onClick={onClick}>
        <i className="bi bi-pencil-fill"></i>
    </button>
  );
}
