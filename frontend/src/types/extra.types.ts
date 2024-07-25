import { UserType } from "@/types/user.types";

export type ExtraTypes = {
  created_at?: Date;
  created_by_user?: UserType;
  updated_at?: Date;
  update_by_user?: UserType;
};

export type LogoType = {
  className: string;
  link: string;
};

export type EditType = {
  className: string;
};

export type DeleteType = {
  className: string;
};

export type TagType = {
  name: string;
  id: number;
};
