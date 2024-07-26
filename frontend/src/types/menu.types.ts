import { GroupType } from "./group.types";

export type MenuItemType = {
  children?: React.ReactNode;
  link?: string;
  title: string;
  menuOpened: boolean;
  focused: boolean;
  focusedClassName: string;
  className: string;
  hasSubItems: boolean;
  userId?: number;
  subItems?: GroupType[] | LinkMenuType[];
  openModal?(value: boolean): void;
  openMenu?(value: boolean): void;
};

export type LinkMenuType = {
  title: string;
  link: string;
};
