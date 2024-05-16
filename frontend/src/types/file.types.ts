import { ExtraTypes } from "./extra.types";

export type FileType = {
    id:number;
    name: string;
    type: string;
    path: string;
  } & ExtraTypes