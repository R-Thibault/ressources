import { useState } from "react";
import { MenuItemType } from "@/types/menu.types";
import Image from "next/image";
import Crown from "@/assets/images/crown.svg";

export default function MenuItem(props: MenuItemType): React.ReactNode {
  const [subMenuExpanded, setSubMenuExpanded] = useState<boolean>(false);

  const itemClassName = props.focused
    ? "menu_item menu_item--focused"
    : "menu_item";

  const contentClassName = props.menuOpened
    ? "menu_item_content_flex-start"
    : "menu_item_content_center";

  const chevronClassName = subMenuExpanded
    ? "bi bi-chevron-up sub_menu_chevron"
    : "bi bi-chevron-down sub_menu_chevron";

  return (
    <div className="menu_item_container">
      <div className={`${itemClassName} ${contentClassName}`}>
        {props.children ? (
          props.children
        ) : (
          <i
            onClick={() => props.openMenu && props.openMenu(true)}
            className={props.focused ? props.focusedClassName : props.className}
          />
        )}
        {props.menuOpened && <span>{props.title}</span>}
        {props.menuOpened && props.hasSubItems && (
          <i
            className={chevronClassName}
            onClick={() => setSubMenuExpanded(!subMenuExpanded)}
          />
        )}
      </div>
      {props.menuOpened && props.hasSubItems && subMenuExpanded && (
        <div className="sub_menu_item">
          <ul>
            {props.subItems?.map((item) => (
              <a
                href={"name" in item ? `/group/${item.id}` : item.link}
                key={"name" in item ? item.name : item.title}
              >
                <li>
                  {"name" in item &&
                    "created_by_user" in item &&
                    (item.created_by_user?.id === props.userId ? (
                      <Image
                        unoptimized
                        src={Crown}
                        alt="creator"
                        width={30}
                        height={30}
                        className="group_icon"
                      ></Image>
                    ) : (
                      <i className="bi bi-person-fill" />
                    ))}
                  {"name" in item ? item.name : item.title}
                </li>
              </a>
            ))}
          </ul>
        </div>
      )}
      {props.title === "Mes groupes" && props.menuOpened && (
        <button
          className="btn_primary menu_button_add_group"
          onClick={() => props.openModal && props.openModal(true)}
        >
          <i className="bi bi-plus-circle" />
          <span>Ajouter un groupe</span>
        </button>
      )}
    </div>
  );
}
