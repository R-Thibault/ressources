import React from "react";
import Image from "next/image";
import { UserType } from "@/types/user.types";
import { DateTime } from "luxon";

export default function avatar(props: { date: Date; user: UserType }) {
  let avatarImage = props.user.avatar?.path.includes("://")
    ? props.user.avatar.path
    : `http://localhost:4000/files/${props.user.avatar?.path.replace(
        "/app/upload/",
        ""
      )}`;

  return (
    <div className="d-flex aligns-items-center py-2 ">
      <div className="d-flex flex-row align-items-center py-2">
        {props.user.avatar ? (
          <Image
            unoptimized
            width={46}
            height={46}
            src={avatarImage}
            alt="jake nackos"
            className="mr-3 rounded-circle"
            onErrorCapture={() => {
              avatarImage = "/assets/avatars/no-image.png";
            }}
          />
        ) : (
          <div className="rounded-circle avatar_message">
            <span className="avatar_default_text_size">
              {props &&
                props.user.firstname.substring(0, 1).toUpperCase() +
                  props.user.lastname.substring(0, 1).toUpperCase()}
            </span>
          </div>
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
