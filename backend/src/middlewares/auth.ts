require("dotenv").config();
import { AuthChecker } from "type-graphql";
import * as jwt from "jsonwebtoken";
import Cookies from "cookies";
import { User } from "../entities/User";
import { NextFunction } from "express";

export type ContextType = {
  req: any;
  res: any;
  user?: User;
};

export async function getUser(req: any, res: any): Promise<User | null> {
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");
  if (!token) {
    return null;
  } else {
    try {
      const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

      if (typeof decodedToken === "object" && "id" in decodedToken) {
        const user = await User.findOne({
          where: { id: decodedToken.id },
          relations: { avatar: true },
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      }
      return null;
    } catch (err) {
      return null;
    }
  }
}

export const customAuthChecker: AuthChecker<ContextType> = async (
  { root, args, context, info },
  roles
) => {
  const connectedUser = await getUser(context.req, context.res);

  if (connectedUser) {
    context.user = connectedUser;
    return true;
  } else {
    return false;
  }
};

export const customRESTAuthChecker = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  const connectedUser = await getUser(req, res);
  if (connectedUser) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
