import { Request, Response } from "express";
import { Ad } from "../entities/Ad";
import { Controller } from ".";
import { validateDatas } from "../utils/validate";
import { DummyProduct } from "../dummyDatas";

export class AdController extends Controller {
  async getAll(req: Request, res: Response) {
    try {
      const datas = await Ad.find({
        relations: {
          category: true,
          tags: true,
        },
        order: {
          price: "DESC",
        },
      });
      res.status(200).send(datas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async getAdsByCategory(req: Request, res: Response) {
    const catId = +req.params.id;
    try {
      const datas = await Ad.find({
        where: {
          category: { id: catId },
        },
        relations: {
          category: true,
          tags: true,
        },
      });
      res.status(200).send(datas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async getOne(req: Request, res: Response) {
    const adId = +req.params.id;
    try {
      const datas = await Ad.findOne({
        where: {
          id: adId,
        },
        relations: {
          category: true,
          tags: true,
        },
      });
      res.status(200).send(datas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async populateDatabase(req: Request, res: Response) {
    for (let i = 0; i < DummyProduct.length; i++) {
      try {
        const newAd = new Ad();
        newAd.title = DummyProduct[i].title;
        newAd.description = DummyProduct[i].description;
        newAd.owner = DummyProduct[i].owner;
        newAd.price = DummyProduct[i].price;
        newAd.imageUrl = DummyProduct[i].picture;
        newAd.location = DummyProduct[i].location;
        newAd.category = DummyProduct[i].category;
        newAd.tags = DummyProduct[i].tags;

        const error = await validateDatas(newAd);
        if (error.length > 0) {
          res.status(400).send({ error: error });
        } else {
          const datas = await newAd.save();
          /*   res.status(200).send({ datas: datas }); */
        }
      } catch (error) {
        res.status(500).send({ error: "error occured" });
      }
    }
  }

  async postOne(req: Request, res: Response) {
    try {
      const newAd = new Ad();
      newAd.title = req.body.title;
      newAd.description = req.body.description;
      newAd.owner = req.body.owner;
      newAd.price = req.body.price;
      newAd.imageUrl = req.body.imageUrl;
      newAd.location = req.body.location;
      newAd.category = req.body.category;
      newAd.tags = req.body.tags;

      const error = await validateDatas(newAd);
      if (error.length > 0) {
        res.status(400).send({ error: error });
      } else {
        const datas = await newAd.save();
        res.status(200).send(datas);
      }
    } catch (error) {
      res.status(500).send({ error: "error occured" });
    }
  }

  async putOne(req: Request, res: Response) {
    const adId = +req.params.id;
    try {
      const ad = await Ad.findOne({
        where: {
          id: adId,
        },
      });
      if (ad) {
        const newAd: Ad = Object.assign(ad, req.body, { id: adId });
        const error = await validateDatas(newAd);
        if (error.length > 0) {
          res.status(400).send({ error: error });
        } else {
          await Ad.save(ad);
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
    const adId = +req.params.id;
    try {
      const ad = await Ad.findOne({
        where: {
          id: adId,
        },
      });

      if (ad) {
        Object.assign(ad, req.body, { id: adId });
        const error = await validateDatas(ad);
        if (error.length > 0) {
          res.status(400).send({ error: error });
        } else {
          await Ad.save(ad);
          res.status(200).send({ message: "success" });
        }
      } else {
        res.status(404).send({ error: `${req.params.id} not fund` });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }

  async deleteOne(req: Request, res: Response) {
    const adId = +req.params.id;
    try {
      const ad = await Ad.findOne({
        where: {
          id: adId,
        },
      });
      await ad?.remove();
      res.status(200).send({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    }
  }
}
