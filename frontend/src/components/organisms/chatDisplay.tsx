import { FormEvent, useEffect, useRef, useState } from "react";
import Message from "../molecules/message";
import {
  CREATE_MESSAGE,
  GET_ALL_MESSAGES_BY_GROUP,
  SUBSCRIPTION_MESSAGE,
} from "@/requests/message";
import { useMutation, useQuery } from "@apollo/client";
import { MessageType } from "@/types/message.types";
import { UserType } from "@/types/user.types";
import { MY_PROFILE } from "@/requests/user";

export default function ChatDisplay(props: {
  opened: boolean;
  groupId: number;
  handleChatDisplay(value: boolean): void;
}): React.ReactNode {
  const [message, setMessage] = useState<string>("");
  const myRef = useRef<HTMLDivElement | null>(null);
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);

  const { data: dataMessages, subscribeToMore } = useQuery<{
    items: MessageType[];
  }>(GET_ALL_MESSAGES_BY_GROUP, {
    variables: { groupId: props.groupId },
  });

  useEffect(() => {
    if (subscribeToMore) {
      if (props.groupId) {
        subscribeToMore({
          document: SUBSCRIPTION_MESSAGE,
          variables: { groupId: props.groupId },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const dataMessages = subscriptionData.data as any;
            return { items: [...prev.items, dataMessages.onMessage] };
          },
        });
      }
    }
  }, [subscribeToMore, props.groupId]);

  const [doCreateMessage, { error: errorCreateMessage }] = useMutation(
    CREATE_MESSAGE,
    { variables: { data: { message, group: props.groupId } } }
  );

  async function createMessage(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (message.length > 0) {
        const result = await doCreateMessage();
        if (errorCreateMessage) {
          console.error(errorCreateMessage.message);
        }
        if (result) {
          setMessage("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={
        props.opened
          ? "chat_container d-flex flex-column chat_container--opened"
          : "chat_container d-flex flex-column chat_container--closed"
      }
    >
      <div className="d-flex justify-content-between align-items-center w-100 px-3 py-2 bottom-divider">
        <span>Messages du groupe</span>
        <i
          className="bi bi-x-circle"
          onClick={() => props.handleChatDisplay(false)}
        />
      </div>
      <div className="d-flex justify-content-between flex-column align-items-between h-100">
        <div ref={myRef} className="px-2 py-2 overflow-auto container">
          {dataMessages?.items.map((item: MessageType) => (
            <Message
              user={dataUser?.item !== undefined ? dataUser?.item : null}
              key={item.id}
              item={item}
            />
          ))}
        </div>
        <form
          onSubmit={(e) => createMessage(e)}
          className="textInput-container d-flex justify-content-between align-items-center px-2 gap-2"
        >
          <textarea
            placeholder="Votre message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></textarea>
          <button type="submit" className="btn_rounded btn_add_message">
            <i className="bi bi-send"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
