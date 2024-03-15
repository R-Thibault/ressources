import Modal from "react-bootstrap/Modal";

export type ModalComponentProps = {
  children: React.ReactNode;
  opened: boolean;
  size?: string;
  openModal(param: boolean): void;
};

export default function ModalComponent(
  props: ModalComponentProps
): React.ReactNode {
  return (
    <Modal show={props.opened} centered>
      <div className="modal_container">
        <div className="header">
          <i
            className="bi bi-x-circle"
            onClick={() => props.openModal(false)}
          />
        </div>
        <div className="content">{props.children}</div>
      </div>
    </Modal>
  );
}
