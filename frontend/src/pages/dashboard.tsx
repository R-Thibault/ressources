import { useEffect, useState } from "react";
import Layout from "@/components/organisms/layout";
import ModalComponent from "@/components/organisms/modal";
import CreateRessourcesForm from "@/components/organisms/createRessourcesForm";
import { useQuery, NetworkStatus } from "@apollo/client";
import { RessourceType } from "@/types/ressources.types";
import { GET_ALL_RESSOURCES_FROM_ONE_USER } from "@/requests/ressources";
import CardsDisplay from "@/components/organisms/cardsDisplay";
import { Spinner } from "react-bootstrap";
import { InView } from "react-intersection-observer";

export default function Dashboard(): React.ReactNode {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [, setSkip] = useState<number>(0);
  const [take] = useState<number>(8);

  function handleModalVisible(value: boolean) {
    setModalVisible(value);
  }

  const {
    data: dataRessources,
    error: errorRessources,
    loading: loadingRessources,
    fetchMore,
    networkStatus,
  } = useQuery<{ items: RessourceType[] }>(GET_ALL_RESSOURCES_FROM_ONE_USER, {
    variables: { skip: 0, take: take },
    notifyOnNetworkStatusChange: true,
  });

  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

  useEffect(() => {
    if (dataRessources && !isFetchingMore) {
      setSkip(dataRessources.items.length);
    }
  }, [dataRessources, isFetchingMore]);

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
          <CreateRessourcesForm onClose={handleModalVisible} />
        </ModalComponent>
        {loadingRessources && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {errorRessources && <p>An error occured, please contact 911</p>}
        {dataRessources && <CardsDisplay ressources={dataRessources?.items} />}
        <InView onChange={handleFetchMore} threshold={0.5}>
          <div className="spinner"></div>
        </InView>
      </div>
    </Layout>
  );
}
