import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserType } from "@/types/user.types";
import { DateTime } from "luxon";

export default function avatar(props: { date: Date; user: UserType }) {
  const [avatarSrc, setAvatarSrc] = useState<string>(
    "/assets/avatars/jake-nackos.jpg"
  );

  useEffect(() => {
    if (props.user.avatar && props.user.avatar.path.includes("://")) {
      setAvatarSrc(props.user.avatar.path);
    } else if (props.user.avatar) {
      setAvatarSrc(
        `http://localhost:4000/files/${props.user.avatar.path.replace(
          "/app/upload/",
          ""
        )}`
      );
    }
  }, [props]);
  return (
    <div className="d-flex aligns-items-center py-2 ">
      <div className="d-flex flex-row align-items-center py-2">
        {props.user.avatar ? (
          <Image
            unoptimized
            width={46}
            height={46}
            src={avatarSrc}
            alt="jake nackos"
            className="mr-3 rounded-circle"
          />
        ) : (
          <Image
            width={46}
            height={46}
            src={"/assets/avatars/jake-nackos.jpg"}
            alt="jake nackos"
            className="mr-3 rounded-circle"
          />
        )}
        <div className="d-flex flex-column align-items-start ms-2">
          <span className="avatar_username">
            {props.user.firstname} {props.user.lastname}
          </span>
          {props.date && (
            <span className="avatar_date_ressource">
              {DateTime.fromISO(props.date.toString())
                .setLocale("fr")
                .toLocaleString(DateTime.DATE_FULL)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
