/* eslint-disable @typescript-eslint/no-explicit-any */
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function ButtonWithToolTip(props: {
  id: string;
  title: string;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={props.id}>{props.title}</Tooltip>}
    >
      {props.children}
    </OverlayTrigger>
  );
}
