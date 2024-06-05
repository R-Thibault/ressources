import { useState } from "react";
import Layout from "@/components/organisms/layout";
import ModalComponent from "@/components/organisms/modal";
import CreateRessourcesForm from "@/components/organisms/createRessourcesForm";
import { useQuery } from "@apollo/client";
import { RessourceType } from "@/types/ressources.types";
import { GET_ALL_RESSOURCES_FROM_ONE_USER } from "@/requests/ressources";
import CardsDisplay from "@/components/organisms/cardsDisplay";
import { Spinner } from "react-bootstrap";
import { TagType } from "@/types/tag.types";
import { GET_ALL_TAGS_FROM_ONE_USER } from "@/requests/tags";
import TagsDisplay from "@/components/organisms/tagsDisplay";

export default function Dashboard(): React.ReactNode {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  function handleModalVisible(value: boolean) {
    setModalVisible(value);
  }

  const {
    data: dataRessources,
    error: errorRessources,
    loading: loadingRessources,
  } = useQuery<{ items: RessourceType[] }>(GET_ALL_RESSOURCES_FROM_ONE_USER);

  const {
    data: dataTags,
    error: errorTags,
    loading: loadingTags,
  } = useQuery<{ items: TagType[] }>(GET_ALL_TAGS_FROM_ONE_USER);

  function handleSelectTag(tag: TagType) {
    if (selectedTags.find((item) => item === tag)) {
      const newTagArray = selectedTags.filter((item) => item !== tag);
      setSelectedTags(newTagArray);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  return (
    <Layout title={"Dashboard"}>
      <div className="ressources_main_container">
        <div className="d-flex justify-content-between align-items-center w-100">
          <h1>Mon Dashboard</h1>
          <div className="d-flex justify-content-start align-items-center search_input_container">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Rechercher" />
          </div>
        </div>
        <div className="add_ressources_button">
          <h2>Mes ressources</h2>
          <button
            className="btn_rounded btn_add_ressources"
            onClick={() => handleModalVisible(true)}
          >
            <i className="bi bi-plus-lg" />
          </button>
        </div>
        <div
          className={`d-flex flex-row align-items-center mt-2 w-100 ${
            dataTags?.items ? "justify-content-between" : "justify-content-end"
          }`}
        >
          {dataTags?.items && (
            <TagsDisplay
              tags={dataTags?.items}
              selectedTags={selectedTags}
              onSelectTag={(tag: TagType) => handleSelectTag(tag)}
            />
          )}
          <div className="d-flex flex-row align-items-center justify-content-center gap-2 sort_buttons_container ">
            <span>TRIER</span>
            <button className="btn_sort">
              <i className="bi bi-sort-down"></i>
            </button>
            <button className="btn_sort">
              <i className="bi bi-sort-up"></i>
            </button>
          </div>
        </div>
        {loadingRessources && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {errorRessources && <p>An error occured, please contact 911</p>}
        {dataRessources && <CardsDisplay ressources={dataRessources?.items} />}
      </div>
      <ModalComponent opened={modalVisible} openModal={handleModalVisible}>
        <CreateRessourcesForm onClose={handleModalVisible} />
      </ModalComponent>
    </Layout>
  );
}
