import { ExtraTypes } from "./extra.types";
import { ImageType } from "./image.types";

export type RessourceType = {
  children?: React.ReactNode;
  id: number;
  title: string;
  description: string;
  image_id: ImageType | null;
  file: RessourceFileType | null;
  link: RessourceLinkType | null;
} & ExtraTypes;

export type RessourceFileType = {
  id: number;
  title: string;
  type: string;
  path: string;
} & ExtraTypes;

export type RessourceLinkType = {
  id: number;
  title: string;
  url: string;
} & ExtraTypes;
