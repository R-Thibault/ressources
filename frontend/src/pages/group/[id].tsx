import Layout from "@/components/organisms/layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardsDisplay from "@/components/organisms/cardsDisplay";
import { GET_RESSOURCES_BY_GROUP_ID } from "@/requests/ressources";
import { useMutation, useQuery } from "@apollo/client";
import { GroupType } from "@/types/group.types";
import {
  DELETE_GROUP,
  DELETE_MEMBER,
  GET_MY_GROUPS,
  GET_ONE_GROUP,
} from "@/requests/group";
import { RessourceType } from "@/types/ressources.types";
import { Spinner } from "react-bootstrap";
import { InView } from "react-intersection-observer";
import SharingGroupForm from "@/components/organisms/sharingGroupForm";
import ModalComponent from "@/components/organisms//modal";
import ButtonWithToolTip from "@/components/atoms/buttonWithToolTips";
import CreateRessourcesForm from "@/components/organisms/createRessourcesForm";
import ChatDisplay from "@/components/organisms/chatDisplay";
import { MY_PROFILE } from "@/requests/user";
import { UserType } from "@/types/user.types";

export type GroupProps = {
  group: GroupType;
};

export type RessourceProps = {
  ressources: RessourceType[];
};

export default function GroupDashboard(): React.ReactNode {
  const router = useRouter();
  const groupId = Number(router.query.id);
  const [modalInviteMemberVisible, setModalInviteMemberVisible] =
    useState<boolean>(false);
  const [modalRessourceVisible, setmodalRessourceVisible] =
    useState<boolean>(false);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [, setSkip] = useState<number>(0);
  const [take] = useState<number>(10);
  const [titleSort, setTitleSort] = useState<string>("");
  const [dateSort, setDateSort] = useState<string>("DESC");
  const [titleSortClass, setTitleSortClass] =
    useState<string>("bi bi-sort-down");
  const [dateSortClass, setDateSortClass] = useState<string>("bi bi-sort-down");
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [deleteGroupError, setDeleteGroupError] = useState<string>("");

  function handleInviteMemberModal(value: boolean) {
    setModalInviteMemberVisible(value);
  }

  function handleChatVisible(value: boolean) {
    setChatVisible(value);
  }

  function handleResourceModal(value: boolean) {
    setmodalRessourceVisible(value);
  }
  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
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
  } = useQuery(GET_RESSOURCES_BY_GROUP_ID, {
    variables: {
      groupId,
      skip: 0,
      take: take,
      whereGroup: { group_id: groupId, title: searchTitle },
      orderBy: {
        created_at: dateSort,
        title: titleSort,
      },
    },
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
  const [groupDelete] = useMutation<{
    item: GroupType;
  }>(DELETE_GROUP, {
    variables: {
      data: {
        group_id: dataGroup?.item.id,
      },
    },
    onCompleted: () => router.replace("/dashboard"),
    onError: (error) => {
      if (error.message.includes("Vous n'êtes pas seul dans le groupe.")) {
        setDeleteGroupError(error.message);
      } else if (
        error.message.includes("Vous n'êtes pas le créateur du groupe.")
      ) {
        setDeleteGroupError(error.message);
      } else {
        setDeleteGroupError(
          "Une erreur est survenue, veuillez contacter l'administrateur du site."
        );
      }
    },
    refetchQueries: [GET_MY_GROUPS],
  });
  const [memberDelete] = useMutation<{
    item: GroupType;
  }>(DELETE_MEMBER, {
    variables: {
      data: {
        group_id: dataGroup?.item.id,
      },
    },
    onCompleted: () => router.replace("/dashboard"),
    onError: (error) => {
      if (
        error.message.includes(
          "Vous êtes le créateur du groupe, action non autorisé"
        )
      ) {
        setDeleteGroupError(error.message);
      } else {
        setDeleteGroupError(
          "Une erreur est survenue, veuillez contacter l'administrateur du site."
        );
      }
    },
    refetchQueries: [GET_MY_GROUPS],
  });

  async function handleGroupQuit(isCreator: boolean) {
    if (
      confirm(
        isCreator
          ? "Êtes-vous sûr de vouloir supprimer ce groupe ?"
          : "Êtes-vous sûr de vouloir quitter ce groupe ?"
      )
    ) {
      if (isCreator) {
        await groupDelete();
      } else {
        await memberDelete();
      }
    }
  }
  useEffect(() => {
    if (dateSort === "ASC" || dateSort === "DESC") {
      setTitleSort("");
      setDateSortClass(
        dateSort === "ASC" ? "bi bi-sort-numeric-down" : "bi bi-sort-numeric-up"
      );
    } else if (dateSort === "") {
      setDateSortClass("bi bi-dash");
    }
  }, [dateSort]);
  useEffect(() => {
    if (titleSort === "ASC" || titleSort === "DESC") {
      setDateSort("");
      setTitleSortClass(
        titleSort === "ASC" ? "bi bi-sort-alpha-down" : "bi bi-sort-alpha-up"
      );
    } else if (titleSort === "") {
      setTitleSortClass("bi bi-dash");
    }
  }, [titleSort]);

  return (
    <Layout title={"Dashboard Groupe"}>
      <div className="ressources_main_container">
        {dataGroup ? (
          <div className="d-flex justify-content-between align-items-center head_wrapper w-100">
            <div className="d-flex actions_wrapper">
              <h1>{dataGroup.item.name}</h1>
              <div className="d-flex ">
                <ButtonWithToolTip
                  id={"button-invite"}
                  title="Inviter des utilisateurs"
                >
                  <button
                    className="btn_rounded btn_rounded_actions"
                    onClick={() => handleInviteMemberModal(true)}
                  >
                    <i className="bi bi-person-fill-add" />
                  </button>
                </ButtonWithToolTip>
                <ButtonWithToolTip
                  id={"button-chat"}
                  title="Discuter avec les membres du groupe"
                >
                  <button
                    className="btn_rounded btn_rounded_actions btn_message"
                    onClick={() => handleChatVisible(true)}
                  >
                    <i className="bi bi-chat" />
                  </button>
                </ButtonWithToolTip>
                <ButtonWithToolTip
                  id={"button-chat"}
                  title={
                    dataUser?.item?.id === dataGroup?.item?.created_by_user?.id
                      ? "Supprimer le groupe"
                      : "Quitter le groupe"
                  }
                >
                  <button
                    className="btn_rounded btn_rounded_actions btn_quit_group "
                    onClick={() =>
                      handleGroupQuit(
                        dataUser?.item?.id ===
                          dataGroup?.item?.created_by_user?.id
                      )
                    }
                  >
                    <i className="bi bi-x-lg" />
                  </button>
                </ButtonWithToolTip>
              </div>
              {deleteGroupError && (
                <span className="text-danger">{deleteGroupError}</span>
              )}
            </div>
            <div className="d-flex justify-content-start align-items-center search_input_container">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Rechercher par titre"
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <>
            <h2>Group Not Found</h2>
          </>
        )}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-2 w-100">
          <div className="add_ressources_button">
            <button
              className="btn_primary message_btn"
              onClick={() => handleResourceModal(true)}
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
        <div className="col-md-12">
          <div className="row">
            <div>
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
              {dataRessources && (
                <CardsDisplay ressources={dataRessources?.items} />
              )}
              <InView onChange={handleFetchMore} threshold={0.5}>
                <div className="spinner"></div>
              </InView>
            </div>
          </div>
        </div>
        <ModalComponent
          opened={modalRessourceVisible}
          openModal={handleResourceModal}
        >
          <CreateRessourcesForm
            onClose={handleResourceModal}
            groupId={groupId}
          />
        </ModalComponent>
        <ModalComponent
          opened={modalInviteMemberVisible}
          openModal={handleInviteMemberModal}
        >
          <SharingGroupForm
            groupId={groupId}
            onClose={handleInviteMemberModal}
          />
        </ModalComponent>
        <ChatDisplay
          groupId={groupId}
          opened={chatVisible}
          handleChatDisplay={handleChatVisible}
        />
      </div>
    </Layout>
  );
}
