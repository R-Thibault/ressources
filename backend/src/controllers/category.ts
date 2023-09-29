import { Request, Response } from "express";
import { Category } from "../entities/Category";
import { Controller } from ".";
import { validateDatas } from "../utils/validate";
import { Like } from "typeorm";
import { DummyCategories } from "../dummyDatas";

export class CategoryController extends Controller {
  async getAll(req: Request, res: Response) {
    const query = req.query;
    try {
      if (query.search) {
        const datas = await Category.findBy({
          title: Like(`${query.search}%`),
        });
        res.status(200).send(datas);
      }
      const datas = await Category.find();
      res.status(200).send(datas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async getOne(req: Request, res: Response) {
    const catId = +req.params.id;
    try {
      const datas = await Category.findOne({
        where: {
          id: catId,
        },
      });
      res.status(200).send(datas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async populateDatabase(req: Request, res: Response) {
    for (let i = 0; i < DummyCategories.length; i++) {
      try {
        const newCategory = new Category();
        newCategory.title = DummyCategories[i].title;

        const error = await validateDatas(newCategory);
        if (error.length > 0) {
          res.status(400).send({ error: error });
        } else {
          const datas = await newCategory.save();
          /*   res.status(200).send({ datas: datas }); */
        }
      } catch (error) {
        res.status(500).send({ error: "error occured" });
      }
    }
  }

  async postOne(req: Request, res: Response) {
    try {
      const newCategory = new Category();
      newCategory.title = req.body.title;

      const error = await validateDatas(newCategory);
      if (error.length > 0) {
        res.status(400).send({ error: error });
      } else {
        const datas = await newCategory.save();
        res.status(200).send(datas);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async putOne(req: Request, res: Response) {
    const catId = +req.params.id;
    try {
      const category = await Category.findOne({
        where: {
          id: catId,
        },
      });
      if (category) {
        const newCategory: Category = Object.assign(category, req.body, {
          id: catId,
        });
        const error = await validateDatas(newCategory);
        if (error.length > 0) {
          res.status(400).send({ error: error });
        } else {
          await Category.save(newCategory);
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
    const catId = +req.params.id;
    try {
      const category = await Category.findOne({
        where: {
          id: catId,
        },
      });
      if (category) {
        const newCategory: Category = Object.assign(category, req.body, {
          id: catId,
        });
        const error = await validateDatas(newCategory);
        if (error.length > 0) {
          res.status(400).send({ error: error });
        } else {
          await Category.save(newCategory);
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

  async deleteOne(req: Request, res: Response) {}
}
