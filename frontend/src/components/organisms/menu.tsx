import { useEffect, useState } from "react";
import { useMutation, useApolloClient, useQuery } from "@apollo/client";
import { MY_PROFILE, SIGN_OUT } from "@/requests/user";
import { GET_MY_GROUPS } from "@/requests/group";
import MenuItem from "../molecules/menuItem";
import Logo from "../atoms/logo";
import { GroupType } from "@/types/group.types";
import { LinkMenuType } from "@/types/menu.types";
import ModalComponent from "./modal";
import CreateGroupForm from "./createGroupForm";
import { UserType } from "@/types/user.types";
import { useRouter } from "next/router";
import Image from "next/image";
import { API_URL } from "@/config/config";
import { Offcanvas } from "react-bootstrap";

export default function Menu(props: {
  width: number;
  opened?: boolean;
  groupId?: number;
  handleMenuMobileOpen?: (value: boolean) => void;
}): React.ReactNode {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [groupModalVisible, setGroupModalVisible] = useState<boolean>(false);
  const [signOut] = useMutation(SIGN_OUT, {
    refetchQueries: [MY_PROFILE],
  });

  useEffect(() => {
    if (!props.opened) {
      setMenuOpened(false);
    } else {
      setMenuOpened(true);
    }
  }, [props.opened]);

  const { data: dataUser } = useQuery<{ item: UserType | null }>(MY_PROFILE);
  const avatarImage = dataUser?.item?.avatar?.path.includes("://")
    ? dataUser?.item?.avatar?.path
    : `${API_URL}/files${dataUser?.item?.avatar?.path.replace(
        "/app/upload",
        ""
      )}`;

  const { data: userGroup } = useQuery<{ items: GroupType[] }>(GET_MY_GROUPS);

  const apolloClient = useApolloClient();
  const router = useRouter();

  async function logOut() {
    try {
      await signOut();
      apolloClient.clearStore();
      router.replace("/sign-in");
    } catch (err) {
      console.error(err);
    }
  }

  function handleModalVisible(value: boolean) {
    setGroupModalVisible(value);
  }

  function handleMenuOpen(value: boolean) {
    setMenuOpened(value);
    if (props.handleMenuMobileOpen) {
      props.handleMenuMobileOpen(value);
    }
  }

  const profileItems: LinkMenuType[] = [
    {
      title: "Mon profil",
      link: "/profil",
    },
    {
      title: "Mon dashboard",
      link: "/dashboard",
    },
  ];

  const legalItems: LinkMenuType[] = [
    {
      title: "Mentions légales",
      link: "/legal-mentions",
    },
  ];

  if (props.width > 575) {
    return (
      <menu
        className={
          menuOpened
            ? "menu_container menu_container--opened"
            : "menu_container menu_container--closed"
        }
      >
        <nav>
          <div className="menu_wrapper">
            <Logo
              className={menuOpened ? "menu_white_logo" : "menu_small_logo"}
              link="/dashboard"
            />
            <MenuItem
              title="Mon espace"
              menuOpened={menuOpened}
              focused={router.pathname.includes("dashboard")}
              focusedClassName="bi bi-person-fill"
              className="bi bi-person"
              hasSubItems={true}
              subItems={profileItems}
              openMenu={handleMenuOpen}
            >
              {dataUser?.item?.avatar ? (
                <Image
                  unoptimized
                  className="rounded-circle"
                  height={40}
                  width={40}
                  alt={`${dataUser.item.firstname} ${dataUser.item.lastname} `}
                  priority
                  src={avatarImage}
                  onClick={() => !menuOpened && setMenuOpened(true)}
                />
              ) : (
                <i
                  onClick={() => !menuOpened && setMenuOpened(true)}
                  className="btn_rounded user_profile_button"
                >
                  <span className="user_profile_name">
                    {dataUser?.item &&
                      dataUser?.item?.firstname.substring(0, 1).toUpperCase() +
                        dataUser?.item?.lastname.substring(0, 1).toUpperCase()}
                  </span>
                </i>
              )}
            </MenuItem>
            <MenuItem
              title="Mes groupes"
              menuOpened={menuOpened}
              focused={router.pathname.includes("group")}
              focusedClassName="bi bi-people-fill"
              className="bi bi-people"
              userId={dataUser?.item?.id}
              hasSubItems={
                userGroup?.items
                  ? userGroup.items.length > 0
                    ? true
                    : false
                  : false
              }
              subItems={userGroup?.items}
              openModal={handleModalVisible}
              openMenu={handleMenuOpen}
            />
          </div>
          <div className="menu_wrapper">
            <MenuItem
              title="Aide"
              menuOpened={menuOpened}
              focused={false}
              focusedClassName="bi bi-question-circle-fill"
              className="bi bi-question-circle"
              hasSubItems={true}
              subItems={legalItems}
              openModal={handleModalVisible}
              openMenu={handleMenuOpen}
            />
            <div className="menu_item_container">
              <button
                onClick={() => logOut()}
                className={
                  menuOpened
                    ? "log_out_btn menu_item_content_flex-start"
                    : "log_out_btn menu_item_content_center"
                }
              >
                <i className="bi bi-box-arrow-right" />
                {menuOpened && <span>Déconnexion</span>}
              </button>
            </div>
            <div id="menu_item_container_close_button">
              <div className="menu_item">
                <button
                  id="menu_wrapper_button"
                  onClick={() => setMenuOpened(!menuOpened)}
                >
                  <i
                    className={
                      !menuOpened
                        ? "bi bi-chevron-double-right"
                        : "bi bi-chevron-double-left"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        </nav>
        <ModalComponent
          opened={groupModalVisible}
          openModal={handleModalVisible}
        >
          <CreateGroupForm onClose={handleModalVisible} />
        </ModalComponent>
      </menu>
    );
  } else {
    return (
      <Offcanvas
        show={menuOpened}
        onHide={() => handleMenuOpen(!menuOpened)}
        scroll={true}
        backdrop="static"
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Logo className="menu_black_logo" link="/dashboard" />
        </Offcanvas.Header>
        <Offcanvas.Body className="mobile_canvas_menu">
          <div>
            <MenuItem
              title="Mon espace"
              menuOpened={true}
              focused={router.pathname.includes("dashboard")}
              focusedClassName="bi bi-person-fill"
              className="bi bi-person"
              hasSubItems={true}
              subItems={profileItems}
              openMenu={handleMenuOpen}
            >
              {dataUser?.item?.avatar ? (
                <Image
                  unoptimized
                  className="rounded-circle"
                  height={40}
                  width={40}
                  alt={`${dataUser.item.firstname} ${dataUser.item.lastname} `}
                  priority
                  src={`${API_URL}/files${dataUser.item.avatar.path.replace(
                    "/app/upload",
                    ""
                  )}`}
                />
              ) : (
                <i className="btn_rounded user_profile_button">
                  <span className="user_profile_name">
                    {dataUser?.item &&
                      dataUser?.item?.firstname.substring(0, 1).toUpperCase() +
                        dataUser?.item?.lastname.substring(0, 1).toUpperCase()}
                  </span>
                </i>
              )}
            </MenuItem>
            <MenuItem
              title="Mes groupes"
              menuOpened={true}
              focused={router.pathname.includes("group")}
              focusedClassName="bi bi-people-fill"
              className="bi bi-people"
              userId={dataUser?.item?.id}
              hasSubItems={
                userGroup?.items
                  ? userGroup.items.length > 0
                    ? true
                    : false
                  : false
              }
              subItems={userGroup?.items}
              openModal={handleModalVisible}
              openMenu={handleMenuOpen}
            />
          </div>
          <div className="menu_wrapper">
            <MenuItem
              title="Aide"
              menuOpened={true}
              focused={false}
              focusedClassName="bi bi-question-circle-fill"
              className="bi bi-question-circle"
              hasSubItems={true}
              subItems={legalItems}
              openModal={handleModalVisible}
              openMenu={handleMenuOpen}
            />
            <div className="menu_item_container">
              <button
                onClick={() => logOut()}
                className="log_out_btn menu_item_content_flex-start"
              >
                <i className="bi bi-box-arrow-right" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
          <ModalComponent
            opened={groupModalVisible}
            openModal={handleModalVisible}
          >
            <CreateGroupForm onClose={handleModalVisible} />
          </ModalComponent>
        </Offcanvas.Body>
      </Offcanvas>
    );
  }
}
