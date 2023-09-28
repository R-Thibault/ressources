import { Request, Response } from "express";
import { Tag } from "../entities/Tag";
import { Controller } from ".";
import { validateDatas } from "../utils/validate";
import { Like } from "typeorm";

export class TagController extends Controller {
  async getAll(req: Request, res: Response) {
    const query = req.query;
    try {
      if (query.search) {
        const datas = await Tag.findBy({
          title: Like(`${query.search}%`),
        });
        res.status(200).send(datas);
      }
      const datas = await Tag.find();
      res.status(200).send(datas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async getOne(req: Request, res: Response) {
    const tagId = +req.params.id;
    try {
      const datas = await Tag.findOne({
        where: {
          id: tagId,
        },
      });
      res.status(200).send(datas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async postOne(req: Request, res: Response) {
    try {
      const newTag = new Tag();
      newTag.title = req.body.title;

      const error = await validateDatas(newTag);
      if (error.length > 0) {
        res.status(400).send({ error: error });
      } else {
        const datas = await newTag.save();
        res.status(200).send(datas);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async putOne(req: Request, res: Response) {
    const tagId = +req.params.id;
    try {
      const tag = await Tag.findOne({
        where: {
          id: tagId,
        },
      });
      if (tag) {
        const newTag: Tag = Object.assign(tag, req.body, {
          id: tagId,
        });
        const error = await validateDatas(newTag);
        if (error.length > 0) {
          res.status(400).send({ error: error });
        } else {
          await Tag.save(newTag);
          res.status(200).send({ message: "success" });
        }
      } else {
        res.status(404).send({ error: `${req.params.id} not found` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async patchOne(req: Request, res: Response) {
    const tagId = +req.params.id;
    try {
      const tag = await Tag.findOne({
        where: {
          id: tagId,
        },
      });
      if (tag) {
        const newTag: Tag = Object.assign(tag, req.body, {
          id: tagId,
        });
        const error = await validateDatas(newTag);
        if (error.length > 0) {
          res.status(400).send({ error: error });
        } else {
          await Tag.save(newTag);
          res.status(200).send({ message: "success" });
        }
      } else {
        res.status(404).send({ error: `${req.params.id} not found` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async deleteOne(req: Request, res: Response) {
    {
      const tagId = +req.params.id;
      try {
        const tag = await Tag.findOne({
          where: {
            id: tagId,
          },
        });
        await tag?.remove();
        res.status(200).send({ message: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: "error occured" });
      }
    }
  }
}
