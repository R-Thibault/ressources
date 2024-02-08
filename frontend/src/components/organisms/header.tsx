import Category from "../category";
import { CategoryProps } from "../adCard";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "@/Request/category";
import { MY_PROFILE, SIGN_OUT } from "@/Request/user";
import Image from "next/image";

export default function Header(): React.ReactNode {
  const { data } = useQuery<{ items: CategoryProps[] }>(GET_ALL_CATEGORIES);
  const { data: dataMe, error } = useQuery<{
    item: { id: number; email: string } | null;
  }>(MY_PROFILE);

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

  return (
    <header>
      <nav>
        <a href="/">
          <img alt="logo Ressources" />
        </a>
        <ul className="header_buttons">
          <li className="dropdown_header_menu dropdown_header_menu_legal_documents">
            <a href="#" className="btn_rounded legal_documents_button">
              <i className="bi bi-question-lg"></i>
            </a>
            <div className="dropdown_content drop_down_content_legal_document ">
              <ul>
                <li>
                  <a href="/#">Conditions générales</a>
                </li>
                <li>
                  <a href="/#">Mentions légales</a>
                </li>
                <li>
                  <a href="/#">Nous contacter</a>
                </li>
              </ul>
            </div>
          </li>
          {dataMe?.item ? (
            <>
              <li>
                <a href="#" className="btn_rounded notifications_button">
                  <i className="bi bi-bell"></i>
                </a>
              </li>
              <li className="dropdown_header_menu dropdown_header_menu_user_profile ">
                <a href="#" className="btn_rounded user_profile_button">
                  <span>MH</span>
                </a>
                <div className="dropdown_content drop_down_content_user_profile">
                  <ul>
                    <li>
                      <a href="/#" className="user_profile_link">
                        <i className="bi bi-person" />
                        Mon profil
                      </a>
                    </li>
                    <li>
                      <a className="log_out_link" onClick={() => logOut()}>
                        <i className="bi bi-box-arrow-right" />
                        Déconnexion
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <li>
              <a href="/sign-in" className="btn_primary">
                <i className="bi bi-person"></i>
                <span>Connexion</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
