import React from "react";

export default function avatar() {
  return (
    <div className="d-flex aligns-items-center py-2 ">
      <div className="d-flex flex-row align-items-center py-2">
        <div className="rounded-circle avatar_message_display"></div>

        <div className="d-flex flex-column align-items-start ms-2"></div>
      </div>
    </div>
  );
}
