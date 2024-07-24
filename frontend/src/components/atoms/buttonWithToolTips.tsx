import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function ButtonWithToolTip(props: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id={props.id}>
          {props.title}
        </Tooltip>
      }
    >
      {props.children}
    </OverlayTrigger>
  );
}
