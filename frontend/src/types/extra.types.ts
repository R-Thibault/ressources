import {UserType} from "@/types/user.types";

export type ExtraTypes = {
  created_at?: Date;
  created_by_user?: UserType | null;
  updated_at?: Date;
  update_by_id?: number;
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
