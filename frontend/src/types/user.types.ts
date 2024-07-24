import { ImageType } from "./image.types";

export type UserType = {
  id: number;
  email?: string;
  lastname: string;
  firstname: string;
  avatar?: ImageType | null;
};

export type UserUpdateType = {
  lastname: string;
  firstname: string;
};
