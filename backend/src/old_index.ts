/* import express from "express";
import sqlite3 from "sqlite3";
import { Response, Request } from "express";

const app = express();

app.use(express.json());

const port = 3000;
const db = new sqlite3.Database("good_corner.sqlite", (error) => {
  if (error) {
    console.log("error connection");
  } else {
    console.log("db connected");
  }
});
db.get("PRAGMA foreign_keys = ON");

app.get("/ads", (req : Request, res: Response) => {
  db.all(
    "SELECT a.*, c.id AS category_id, c.title AS category_name FROM ad AS a INNER JOIN category AS c ON c.id = a.category_id",
    (error, datas) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "error occured" });
      } else {
        res.status(200).send(datas);
      }
    }
  );
});

app.get("/category/:id/ads",  (req : Request, res: Response) => {
  const categoryId: Number = +req.params.id;
  const order = req.query.order;
  let sql = `SELECT a.*, c.id AS category_id, c.title AS category_name FROM ad AS a INNER JOIN category AS c ON c.id = a.category_id WHERE c.id = ${categoryId}`;

  switch (order) {
    case "desc":
      sql += " ORDER BY a.price DESC";
      break;
    case "asc":
      sql += " ORDER BY a.price ASC";
      break;
    default:
      break;
  }

  db.all(sql, (error, datas) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    } else {
      res.status(200).send(datas);
    }
  });
});

app.get("/locations/:locationName/ads",  (req : Request, res: Response) => {
  const locationName: string = req.params.locationName.toLocaleLowerCase();
  db.all(
    `SELECT a.*, c.id AS category_id, c.title AS category_name FROM ad AS a INNER JOIN category AS c ON c.id = a.category_id WHERE LOWER(a.location) = ${JSON.stringify(
      locationName
    )}`,
    (error, datas) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "error occured" });
      } else {
        res.status(200).send(datas);
      }
    }
  );
});

app.post("/category",  (req : Request, res: Response) => {
  db.run(
    "INSERT INTO category (title) VALUES ($title)",
    {
      $title: req.body.title,
    },
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "error occured" });
      } else {
        res.status(200).send({ message: "success" });
      }
    }
  );
});

app.put("/category/:id",  (req : Request, res: Response) => {
  const categoryId :number = +req.params.id;
  db.run(
    `UPDATE category SET title=$title WHERE id=${categoryId}`,
    {
      $title: req.body.title,
    },
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "error occured" });
      } else {
        res.status(200).send({ message: "success" });
      }
    }
  );
});

app.post("/ads",  (req : Request, res: Response) => {
  db.run(
    "INSERT INTO ad (title, description, owner, price, createdAt, imageUrl, location, category_id) VALUES ($title, $description, $owner, $price, $createdAt, $imageUrl, $location, $category_id)",
    {
      $title: req.body.title,
      $description: req.body.description,
      $owner: req.body.owner,
      $price: req.body.price,
      $createdAt: new Date().toJSON(),
      $imageUrl: req.body.picture,
      $location: req.body.location,
      $category_id: req.body.category_id,
    },
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "error occured" });
      } else {
        res.status(204).send({ message: "success" });
      }
    }
  );
});

app.patch("/ads/:id",  (req : Request, res: Response) => {
  const adId = +req.params.id;
  const fieldsKeys = Object.keys(req.body);
  let query = "UPDATE ad SET";
  for (let i = 0; i < fieldsKeys.length; i++) {
    if (i > 0) {
      query += ",";
    }
    let field = fieldsKeys[i];
    switch (field) {
      case "title":
        query += ` ${field}=${JSON.stringify(req.body.title)}`;
        break;
      case "description":
        query += ` ${field}=${JSON.stringify(req.body.description)}`;
        break;
      case "owner":
        query += ` ${field}=${JSON.stringify(req.body.owner)}`;
        break;
      case "price":
        query += ` ${field}=${req.body.price}`;
        break;
      case "imageUrl":
        query += ` ${field}=${JSON.stringify(req.body.imageUrl)}`;
        break;
      case "location":
        query += ` ${field}=${JSON.stringify(req.body.location)}`;
        break;
      case "category_id":
        query += ` ${field}=${req.body.category_id}`;
        break;
      default:
        break;
    }
  }
  query += ` WHERE id=${adId}`;
  db.run(query, (error) => {
    if (error) {
      console.log(error);
      res.status(500).send({ error: "error occured" });
    } else {
      res.status(200).send({ message: "success" });
    }
  });
});

app.put("/ads/:id",  (req : Request, res: Response) => {
  const adId = req.params.id;
  db.run(
    "UPDATE ad SET title=$title, description=$description, owner=$owner, price=$price, createdAt=$createdAt, imageUrl=$imageUrl, location=$location, category_id=$category_id WHERE id=$id",
    {
      $id: adId,
      $title: req.body.title,
      $description: req.body.description,
      $owner: req.body.owner,
      $price: req.body.price,
      $createdAt: new Date().toJSON(),
      $imageUrl: req.body.picture,
      $location: req.body.location,
      $category_id: req.body.category_id,
    },
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "error occured" });
      } else {
        res.status(200).send({ message: "success" });
      }
    }
  );
});

app.delete("/ads/:id",  (req : Request, res: Response) => {
  const adId = +req.params.id;
  db.run(
    "DELETE FROM ad WHERE id=$adId",
    {
      $adId: adId,
    },
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error: "error occured" });
      } else {
        res.status(200).send({ message: "success" });
      }
    }
  );
});

app.listen(port, () => {
  console.log("server started");
});
 */
