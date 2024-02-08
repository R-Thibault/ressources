import { ExtraTypes } from "./extra.types";

export type GroupType = {
  id: number;
  name: string;
  description: string;
  token: number;
} & ExtraTypes;
