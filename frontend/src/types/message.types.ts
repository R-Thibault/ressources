import { ExtraTypes } from "./extra.types";
import { UserType } from "./user.types";

export type MessageType = {
  id: number;
  message: string;
  created_by_user: UserType;
} & ExtraTypes;
