import { ValidationError, validate } from "class-validator";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";

export const validateDatas = async (
  datas: Ad | Category | Tag
): Promise<ValidationError[]> => {
  const errors = await validate(datas);
  if (errors.length > 0) {
    console.log(errors);
    return errors;
  }
  return [];
};
