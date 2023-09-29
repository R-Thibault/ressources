import { Response, Request } from "express";

export class Controller {
  constructor() {}

  getAll(req: Request, res: Response): void {
    this.NotImplemented(req, res);
  }
  getOne(req: Request, res: Response): void {
    this.NotImplemented(req, res);
  }
  postOne(req: Request, res: Response): void {
    this.NotImplemented(req, res);
  }
  populateDatabase(req: Request, res: Response): void {
    this.NotImplemented(req, res);
  }
  putOne(req: Request, res: Response): void {
    this.NotImplemented(req, res);
  }
  patchOne(req: Request, res: Response): void {
    this.NotImplemented(req, res);
  }
  deleteOne(req: Request, res: Response): void {
    this.NotImplemented(req, res);
  }

  NotImplemented(req: Request, res: Response): void {
    res.status(404).send({ message: "error, controller not ok" });
  }
}
