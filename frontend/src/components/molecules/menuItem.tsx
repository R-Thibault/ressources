import { useState } from "react";
import { MenuItemType } from "@/types/menu.types";

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
            className={props.focused ? props.focusedClassName : props.className}
          />
        )}
        {props.menuOpened && <a href={props.link}>{props.title}</a>}
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
                href={"name" in item ? `/group/${item.token}` : item.link}
                key={"name" in item ? item.name : item.title}
              >
                <li>{"name" in item ? item.name : item.title}</li>
              </a>
            ))}
          </ul>
        </div>
      )}
      {props.title === "Mes groupes" && props.menuOpened && (
        <button className="btn_primary menu_button_add_group">
          <i className="bi bi-plus-circle" />
          <span>Ajouter un groupe</span>
        </button>
      )}
    </div>
  );
}
