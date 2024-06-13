export type ExtraTypes = {
  created_at?: Date;
  created_by_id?: number | null;
  updated_at?: Date;
  update_by_id?: number;
};

export type LogoType = {
  className: string;
  link: string;
};

export type LikeType = {
  className: string;
};

export type TagType = {
  name: string;
  id: number;
};
