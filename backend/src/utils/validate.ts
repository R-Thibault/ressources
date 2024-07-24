import { ValidationError, validate } from "class-validator";

import { User, UserCreateInput } from "../entities/User";

export const validateDatas = async (
  datas: User | UserCreateInput
): Promise<ValidationError[]> => {
  const errors = await validate(datas);
  if (errors.length > 0) {
    console.error(errors);
    return errors;
  }
  return [];
};
