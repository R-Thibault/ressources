import { useEffect, useState } from "react";
import Layout from "@/components/organisms/layout";
import ModalComponent from "@/components/organisms/modal";
import CreateRessourcesForm from "@/components/organisms/createRessourcesForm";
import { useQuery } from "@apollo/client";
import { RessourceType } from "@/types/ressources.types";
import { GET_ALL_RESSOURCES_FROM_ONE_USER } from "@/requests/ressources";
import CardsDisplay from "@/components/organisms/cardsDisplay";
import { Spinner } from "react-bootstrap";
import { InView } from "react-intersection-observer";

export default function Dashboard(): React.ReactNode {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [titleSort, setTitleSort] = useState<string>("");
  const [titleSortClass, setTitleSortClass] =
    useState<string>("bi bi-sort-down");
  const [dateSortClass, setDateSortClass] = useState<string>("bi bi-sort-down");
  const [dateSort, setDateSort] = useState<string>("DESC");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [, setSkip] = useState<number>(0);
  const [take] = useState<number>(10);

  function handleModalVisible(value: boolean) {
    setModalVisible(value);
  }

  const {
    data: dataRessources,
    error: errorRessources,
    loading: loadingRessources,
    fetchMore,
  } = useQuery<{ items: RessourceType[] }>(GET_ALL_RESSOURCES_FROM_ONE_USER, {
    variables: {
      skip: 0,
      take: take,
      where: { title: searchTitle },
      orderBy: {
        created_at: dateSort,
        title: titleSort,
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  const handleFetchMore = async (inView: boolean) => {
    if (inView && dataRessources?.items.length) {
      try {
        await fetchMore({
          variables: {
            skip: dataRessources.items.length,
            take: take,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;
            return {
              items: [...previousResult.items, ...fetchMoreResult.items],
            };
          },
        });

        setSkip((prevSkip) => prevSkip + take);
      } catch (error) {
        console.error("Error fetching more data:", error);
      }
    }
  };

  useEffect(() => {
    if (dateSort === "ASC" || dateSort === "DESC") {
      setTitleSort("");
      setDateSortClass(
        dateSort === "ASC" ? "bi bi-sort-numeric-up" : "bi bi-sort-numeric-down"
      );
    } else if (dateSort === "") {
      setDateSortClass("bi bi-dash");
    }
  }, [dateSort]);

  useEffect(() => {
    if (titleSort === "ASC" || titleSort === "DESC") {
      setDateSort("");
      setTitleSortClass(
        titleSort === "ASC" ? "bi bi-sort-alpha-up" : "bi bi-sort-alpha-down"
      );
    } else if (titleSort === "") {
      setTitleSortClass("bi bi-dash");
    }
  }, [titleSort]);

  return (
    <Layout title={"Dashboard"}>
      <div className="ressources_main_container">
        <div className="d-flex justify-content-between align-items-center w-100 head_wrapper">
          <h1>Mon Dashboard</h1>
          <div className="d-flex justify-content-start align-items-center search_input_container">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Rechercher par titre"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-2 w-100">
          <div className="add_ressources_button">
            <button
              className="btn_primary message_btn"
              onClick={() => handleModalVisible(true)}
            >
              <i className="bi bi-plus-circle" />
              <span>Ajouter une ressource</span>
            </button>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center gap-2 sort_buttons_container ">
            <span>Trier par:</span>
            <button
              className="btn_sort"
              onClick={() =>
                titleSort === "DESC" || titleSort === ""
                  ? setTitleSort("ASC")
                  : setTitleSort("DESC")
              }
            >
              <i id="title-sort" className={titleSortClass}></i>
              Titre
            </button>
            <button
              className="btn_sort"
              onClick={() =>
                dateSort === "DESC" || dateSort === ""
                  ? setDateSort("ASC")
                  : setDateSort("DESC")
              }
            >
              <i id="date-sort" className={dateSortClass}></i>
              Date
            </button>
          </div>
        </div>
        {loadingRessources && (
          <div className="loader_container">
            <div className="d-inline-flex">
              <Spinner className="spinner_purple" animation="grow" />
              <Spinner className="spinner_blue" animation="grow" />
              <Spinner className="spinner_red" animation="grow" />
            </div>
          </div>
        )}
        {errorRessources && <p>{errorRessources.message}</p>}
        {dataRessources && <CardsDisplay ressources={dataRessources?.items} />}
        <InView onChange={handleFetchMore} threshold={0.5}>
          <div className="spinner"></div>
        </InView>
      </div>
      <ModalComponent opened={modalVisible} openModal={handleModalVisible}>
        <CreateRessourcesForm onClose={handleModalVisible} />
      </ModalComponent>
    </Layout>
  );
}
