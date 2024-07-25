import { MessageType } from "@/types/message.types";
import { UserType } from "@/types/user.types";
import Image from "next/image";
import { DateTime } from "luxon";
import { API_URL } from "@/config/config";

export default function Message(props: {
  item: MessageType;
  user: UserType | null;
}) {
  let avatarImage = props.item.created_by_user.avatar?.path.includes("://")
    ? props.item.created_by_user.avatar?.path
    : `${API_URL}/files${props.item.created_by_user.avatar?.path.replace(
        "/app/upload",
        ""
      )}`;
  return (
    <div
      className={`d-flex justify-content-between align-items-start gap-2 w-100 mb-2 ${
        props.user !== null &&
        props.user.id === props.item.created_by_user.id &&
        "flex-row-reverse"
      }`}
    >
      {props.item.created_by_user.avatar ? (
        <Image
          width={40}
          height={40}
          src={avatarImage}
          alt={`${props.item.created_by_user.firstname} ${props.item.created_by_user.lastname}`}
          className="mr-3 rounded-circle"
          onErrorCapture={() => {
            avatarImage = "/assets/avatars/no-image.png";
          }}
        />
      ) : (
        <div className="rounded-circle avatar_message">
          <span className="avatar_message_text_size">
            {props &&
              props.item.created_by_user.firstname
                .substring(0, 1)
                .toUpperCase() +
                props.item.created_by_user.lastname
                  .substring(0, 1)
                  .toUpperCase()}
          </span>
        </div>
      )}
      <div className="d-flex w-100 flex-column justify-content-center align-items-start mb-2">
        <div
          className={`message-container px-3 py-2 ${
            props.user !== null &&
            props.user.id === props.item.created_by_user.id &&
            "user-message"
          }`}
        >
          <p className="text-container">{props.item.message}</p>
        </div>
        {props.item.created_at && (
          <span className="message_date px-2 py-1">
            {DateTime.fromISO(props.item.created_at.toString())
              .setLocale("fr")
              .toLocaleString(DateTime.DATETIME_MED)}
          </span>
        )}
      </div>
    </div>
  );
}
