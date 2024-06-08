import Layout from "@/components/organisms/layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardsDisplay from "@/components/organisms/cardsDisplay";
import { GET_RESSOURCES_BY_GROUP_ID } from "@/requests/ressources";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GroupType } from "@/types/group.types";
import { GET_ONE_GROUP } from "@/requests/group";
import { RessourceType } from "@/types/ressources.types";
import { Spinner } from "react-bootstrap";
import { InView } from "react-intersection-observer";

export type GroupProps = {
  group: GroupType;
};

export type RessourceProps = {
  ressources: RessourceType[];
};

export default function GroupDashboard(): React.ReactNode {
  const router = useRouter();
  const groupId = Number(router.query.id);
  const [, setSkip] = useState<number>(0);
  const [take] = useState<number>(10);

  const { data: dataGroup } = useQuery<{ item: GroupType }>(GET_ONE_GROUP, {
    variables: {
      id: groupId,
    },
  });

  const {
    data: dataRessources,
    error: errorRessources,
    loading: loadingRessources,
    fetchMore,
    networkStatus,
  } = useQuery(GET_RESSOURCES_BY_GROUP_ID, {
    variables: {
      groupId,
      skip: 0,
      take: take,
    },
  });
  const isFetchingMore = networkStatus === NetworkStatus.fetchMore;

  useEffect(() => {
    if (dataRessources && !isFetchingMore) {
      setSkip(dataRessources.items?.length);
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
    <Layout title={"Dashboard Groupe"}>
      <div className="ressources_main_container">
        {dataGroup ? (
          <>
            <h2>{dataGroup.item.name}</h2>
            <p>{dataGroup.item.description}</p>
          </>
        ) : (
          <>
            <h2>Group Not Found</h2>
          </>
        )}
        <div className="add_ressources_button">
          <h2>Ressources</h2>
          <button
            className="btn_rounded btn_add_ressources"
            onClick={() => handleModalVisible(true)}
          >
            <i className="bi bi-plus-circle" />
          </button>
        </div>
        <div className="col-md-12">
          <div className="row">
            <div>
              {loadingRessources && (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              {errorRessources && <p>An error occured, please contact 911</p>}
              {dataRessources && (
                <CardsDisplay ressources={dataRessources?.items} />
              )}
              <InView onChange={handleFetchMore} threshold={0.5}>
                <div className="spinner"></div>
              </InView>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
