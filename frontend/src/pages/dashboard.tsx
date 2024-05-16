import { useState } from "react";
import Layout from "@/components/organisms/layout";
import ModalComponent from "@/components/organisms/modal";
import CreateRessourcesForm from "@/components/organisms/createRessourcesForm";

export default function Dashboard(): React.ReactNode {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  function handleModalVisible(value: boolean) {
    setModalVisible(value);
  }

  return (
    <Layout title={"Dashboard"}>
      {/* <TagsDisplay /> */}
      <div className="ressources_main_container">
        <div className="add_ressources_button">
          <h2>Mes ressources</h2>
          <button
            className="btn_rounded btn_add_ressources"
            onClick={() => handleModalVisible(true)}
          >
            <i className="bi bi-plus-circle" />
          </button>
        </div>
        <ModalComponent opened={modalVisible} openModal={handleModalVisible}>
          <CreateRessourcesForm handleSubmit={handleModalVisible} />
        </ModalComponent>
      </div>
    </Layout>
  );
}
