import React from "react";
import Image from "next/image";

export default function avatar() {
  return (
    <div className="d-flex aligns-items-center">
      <div className="flex-shrink-0 px-4 py-2">
        <Image
          width={42}
          height={42}
          src={"/assets/avatars/jake-nackos.jpg"}
          alt="jake nackos"
          className="mr-3 rounded-circle"
        />
      </div>
      <div className="d-flex aligns-items-center flex-grow-1 ">
        <p className="my-auto">Jaky Nackos</p>
      </div>
    </div>
  );
}
