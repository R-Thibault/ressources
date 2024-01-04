import { ValidationError, validate } from "class-validator";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { User, InputUser } from "../entities/User";

export const validateDatas = async (
  datas: Ad | Category | Tag | User | InputUser
): Promise<ValidationError[]> => {
  const errors = await validate(datas);
  if (errors.length > 0) {
    console.log(errors);
    return errors;
  }
  return [];
};
