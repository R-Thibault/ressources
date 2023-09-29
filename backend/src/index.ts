import "reflect-metadata";
import express from "express";
import { dataSource } from "./datasource";
import { AdController } from "./controllers/ad";
import { CategoryController } from "./controllers/category";
import { TagController } from "./controllers/tag";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = 4000;

const adController = new AdController();

app.get("/ads", adController.getAll);
app.get("/ads/:id", adController.getOne);
app.post("/ads", adController.postOne);
app.post("/populateAds", adController.populateDatabase);
app.put("/ads/:id", adController.putOne);
app.patch("/ads/:id", adController.patchOne);
app.delete("/ads/:id", adController.deleteOne);

const categoryController = new CategoryController();

app.get("/category", categoryController.getAll);
app.get("/category/:id", categoryController.getOne);
app.post("/category", categoryController.postOne);
app.post("/populateCategories", categoryController.populateDatabase);
app.put("/category/:id", categoryController.putOne);
app.patch("/category/:id", categoryController.patchOne);
app.delete("/category/:id", categoryController.deleteOne);

const tagController = new TagController();

app.get("/tag", tagController.getAll);
app.get("/tag/:id", tagController.getOne);
app.post("/tag", tagController.postOne);
app.post("/populateTags", tagController.populateDatabase);
app.put("/tag/:id", tagController.putOne);
app.patch("/tag/:id", tagController.patchOne);
app.delete("/tag/:id", tagController.deleteOne);

app.listen(port, async () => {
  try {
    await dataSource.initialize();
    console.log("server ready !");
  } catch (error) {
    console.log(error);
  }
});
