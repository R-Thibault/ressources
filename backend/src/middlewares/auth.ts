require('dotenv').config()
import { AuthChecker } from "type-graphql";
import * as jwt from "jsonwebtoken";
import Cookies from "cookies";
import { User } from "../entities/User";

export type ContextType = {
  req: any;
  res: any;
  user?: User;
};

export const customAuthChecker: AuthChecker<ContextType> = async (
  { root, args, context, info },
  roles
) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  if (!token) {
    return false;
  } else {
    try {
      const decodedToken = jwt.verify(
        token,
        `${process.env.JWT_SECRET_KEY}`
      );

      if (typeof decodedToken === "object" && "id" in decodedToken) {
        const user = await User.findOneBy({ id: decodedToken.id });
        if (user) {
          context.user = user;
        } else {
          throw Error("no user found");
        }
      }
      return true;
    } catch (err) {
      return false;
    }
  }
};
