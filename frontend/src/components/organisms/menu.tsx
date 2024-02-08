import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { MY_PROFILE, SIGN_OUT } from "@/Request/user";
import MenuItem from "../molecules/menuItem";
import Logo from "../atoms/logo";
import { GroupType } from "@/types/group.types";
import { LinkMenuType } from "@/types/menu.types";

export default function Menu(): React.ReactNode {
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [signOut, { error: signOutError }] = useMutation<null>(SIGN_OUT, {
    refetchQueries: [MY_PROFILE],
  });

  const apolloClient = useApolloClient();

  async function logOut() {
    try {
      apolloClient.clearStore();
      await signOut();
    } catch (error) {
      console.log(error);
    }
  }

  const profileItems: LinkMenuType[] = [
    {
      title: "Mon dashboard",
      link: "/dashboard",
    },
    {
      title: "Mes ressources favorites",
      link: "/ressources/favorites",
    },
  ];

  const legalItems: LinkMenuType[] = [
    {
      title: "Condition d'utilisation",
      link: "/terms-and-conditions",
    },
    {
      title: "Politique de confidentialité",
      link: "/privacy-policy",
    },
    {
      title: "Mentions légales",
      link: "/legal-mentions",
    },
  ];

  const groupItems: GroupType[] = [
    {
      id: 1,
      name: "Groupe 1",
      description: "Lorem ipsum",
      token: 1234,
      created_at: new Date(),
      created_by_id: 1,
      updated_at: new Date(),
      update_by_id: 1,
    },
    {
      id: 2,
      name: "Nom de groupe super long pour voir le résultat",
      description: "Lorem ipsum",
      token: 1234,
      created_at: new Date(),
      created_by_id: 2,
      updated_at: new Date(),
      update_by_id: 2,
    },
    {
      id: 3,
      name: "Hello Groupe",
      description: "Lorem ipsum",
      token: 1234,
      created_at: new Date(),
      created_by_id: 1,
      updated_at: new Date(),
      update_by_id: 1,
    },
  ];

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
            link="/"
          />
          <MenuItem
            title="Mon profil"
            link="/"
            menuOpened={menuOpened}
            focused={true}
            focusedClassName="bi bi-person-fill"
            className="bi bi-person"
            hasSubItems={true}
            subItems={profileItems}
          >
            <i className="btn_rounded user_profile_button">
              <span>MH</span>
            </i>
          </MenuItem>
          <MenuItem
            title="Mes groupes"
            link="#"
            menuOpened={menuOpened}
            focused={false}
            focusedClassName="bi bi-person-fill"
            className="bi bi-people"
            hasSubItems={groupItems.length > 0}
            subItems={groupItems}
          />
        </div>
        <div className="menu_wrapper">
          <MenuItem
            title="Mes notifications"
            link="#"
            menuOpened={menuOpened}
            focused={false}
            focusedClassName="bi bi-bell-fill"
            className="bi bi-bell"
            hasSubItems={false}
          />
          <MenuItem
            title="Aide"
            link="#"
            menuOpened={menuOpened}
            focused={false}
            focusedClassName="bi bi-question-circle-fill"
            className="bi bi-question-circle"
            hasSubItems={true}
            subItems={legalItems}
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
    </menu>
  );
}
