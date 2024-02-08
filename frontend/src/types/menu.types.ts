import { GroupType } from "./group.types";

export type MenuItemType = {
  children?: React.ReactNode;
  link: string;
  title: string;
  menuOpened: boolean;
  focused: boolean;
  focusedClassName: string;
  className: string;
  hasSubItems: boolean;
  subItems?: GroupType[] | LinkMenuType[];
};

export type LinkMenuType = {
  title: string;
  link: string;
};
