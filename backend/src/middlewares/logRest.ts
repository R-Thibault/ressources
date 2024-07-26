//import { Log } from "../mongo";
import { Request, NextFunction, Response } from "express";
import { getUser } from "./auth";
import { Log } from "../mongo";

const logger = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "POST") {
    const user = await getUser(req, res);
    if (user) {
      if (Object.keys(req.body).length === 0) {
        const log = new Log({
          message: `Request  ${req.method} ${req.url}`,
          user: `${user.id}`,
        });
        await log.save();
      }
    }
  }

  next();
};

export default logger;
