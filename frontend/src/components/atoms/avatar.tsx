import React from "react";
import Image from "next/image";
import { UserType } from "@/types/user.types";
import { DateTime } from "luxon";

export default function avatar(props: { date: string; user: UserType }) {
  return (
    <div className="d-flex aligns-items-center py-2 ">
      <div className="d-flex flex-row align-items-center py-2">
        {props.user.avatar ? (
          <Image
            unoptimized
            width={46}
            height={46}
            src={props.user.avatar?.path}
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
              {DateTime.fromISO(props.date)
                .setLocale("fr")
                .toLocaleString(DateTime.DATE_FULL)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
