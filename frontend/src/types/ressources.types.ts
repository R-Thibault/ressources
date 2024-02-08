import { ExtraTypes } from "./extra.types";
import { ImageType } from "./image.types";

export type RessourceType = {
  id: number;
  title: string;
  description: string;
  image: ImageType | null;
  file: RessourceFileType | null;
  link: RessourceLinkType | null;
  isFavorite: boolean;
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
