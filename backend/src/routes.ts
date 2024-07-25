import multer from "multer";
import express, { Router } from "express";
import { Image } from "./entities/Image";
import { User } from "./entities/User";
import sharp from "sharp";
import mime from "mime-types";
import { File } from "./entities/File";
import path from "path";
import { customRESTAuthChecker } from "./middlewares/auth";
import { unlink } from "node:fs";
import { Ressource } from "./entities/Ressource";
import { validate } from "class-validator";

export function initializeRoutes(app: Router) {
  app.use("/files", express.static(path.join(__dirname, "../upload")));
  const acceptedAvatarMimeType = ["image/jpg", "image/png", "image/jpeg"];
  const acceptedRessourcesImageMimeType = [
    "image/jpg",
    "image/png",
    "image/jpeg",
  ];
  const acceptedFileMimeType = [
    "image/jpg",
    "image/png",
    "image/jpeg",
    "application/pdf",
    "application/zip",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  const avatarStorage = multer.memoryStorage();
  const RessourceImageStorage = multer.memoryStorage();
  const ressourcesStorage = multer.diskStorage({
    destination: "/app/upload/ressources",
    filename: function (req, file, cb) {
      const filename = file.originalname.split(".");
      const mimetype = file.mimetype.split("/");
      cb(null, Date.now() + "_" + filename[0] + "." + mimetype[1]);
    },
  });

  const uploadAvatarDirectory = multer({
    storage: avatarStorage,
    limits: {
      fileSize: 1048576 * 5,
    },
    fileFilter: (req, file, cb) => {
      if (acceptedAvatarMimeType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        return cb(new Error("Invalid mime type"));
      }
    },
  });
  const uploadRessourceImageDirectory = multer({
    storage: RessourceImageStorage,
    limits: {
      fileSize: 1048576 * 5,
    },
    fileFilter: (req, file, cb) => {
      if (acceptedRessourcesImageMimeType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        return cb(new Error("Invalid mime type"));
      }
    },
  });

  const uploadRessourcesDirectory = multer({
    storage: ressourcesStorage,
    limits: {
      fileSize: 1048576 * 5,
    },
    fileFilter: (req, file, cb) => {
      if (acceptedFileMimeType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        return cb(new Error("Invalid mime type"));
      }
    },
  });

  app.post(
    "/upload/avatar",
    customRESTAuthChecker,
    uploadAvatarDirectory.single("file"),
    async (req, res) => {
      try {
        const user = await User.findOneBy({ id: req.body.userId });
        if (req.file && req.file.mimetype.startsWith("image/") && user) {
          const extension = mime.extension(req.file.mimetype);
          const originalName = req.file.originalname.split(".");
          const fileName = `${Date.now()}-U${user.id}-${
            originalName[0]
          }.${extension}`;
          await sharp(req.file.buffer)
            .resize(250, 250, { fit: "cover" })
            .toFile(`/app/upload/avatar/${fileName}`);
          const image = new Image();
          image.name = fileName;
          image.path = `/avatar/${fileName}`;
          image.created_by_user = req.body.userId;
          const result = await image.save();
          user.avatar = result;
          await user.save();
          res.json(result);
        } else {
          res.status(404).send({
            message: "Une erreur est survenue",
          });
        }
      } catch (error) {
        res.status(404).send({
          message: error,
        });
      }
    }
  );

  app.post(
    "/upload/file",
    customRESTAuthChecker,
    uploadRessourcesDirectory.single("file"),
    async (req, res) => {
      try {
        if (req.file && req.body.userId) {
          const user = await User.findOneBy({ id: req.body.userId });
          if (!user) {
            res.status(404).send({
              message: "utilisateur introuvable",
            });
          }
          const file = new File();
          file.name = req.file.originalname;
          file.type = req.file.mimetype;
          file.path = req.file.path;
          file.created_by_user = req.body.userId;
          const result = await file.save();
          res.status(200).json(result);
        } else {
          res.status(400).send({
            message: "Une erreur est survenue",
          });
        }
      } catch (error) {
        res.status(500).send({
          message: "Une erreur est survenue",
        });
      }
    }
  );
  app.post(
    "/upload/ressourceImage",
    customRESTAuthChecker,
    uploadRessourceImageDirectory.single("file"),
    async (req, res) => {
      try {
        const user = await User.findOneBy({ id: req.body.userId });
        if (req.file && req.file.mimetype.startsWith("image/") && user) {
          const extension = mime.extension(req.file.mimetype);
          const originalName = req.file.originalname.split(".");
          const fileName = `${Date.now()}-U${user.id}-${
            originalName[0]
          }.${extension}`;
          await sharp(req.file.buffer)
            .resize(450, 450, { fit: "cover" })
            .toFile(`/app/upload/ressourcesImages/${fileName}`);
          const image = new Image();
          image.name = fileName;
          image.path = `/ressourcesImages/${fileName}`;
          image.created_by_user = req.body.userId;
          const result = await image.save();
          res.json(result);
        } else {
          res.status(404).send({
            message: "Une erreur est survenue",
          });
        }
      } catch (error) {
        res.status(404).send({
          message: error,
        });
      }
    }
  );
  app.post(
    "/upload/updateRessourceImage",
    customRESTAuthChecker,
    uploadRessourceImageDirectory.single("file"),
    async (req, res) => {
      try {
        const previousImageId = req.body.previousImageId;
        const user = await User.findOneBy({ id: req.body.userId });
        if (req.file && req.file.mimetype.startsWith("image/") && user) {
          const extension = mime.extension(req.file.mimetype);
          const originalName = req.file.originalname.split(".");
          const fileName = `${Date.now()}-U${user.id}-${
            originalName[0]
          }.${extension}`;
          await sharp(req.file.buffer)
            .resize(450, 450, { fit: "cover" })
            .toFile(`/app/upload/ressourcesImages/${fileName}`);
          if (previousImageId) {
            const previousImage = await Image.findOne({
              where: { id: Number(previousImageId) },
            });
            const ressource = await Ressource.findOne({
              where: { id: req.body.ressourceId },
              relations: { image_id: true },
            });
            if (ressource) {
              ressource.image_id = null;
              await validate(ressource);
              await ressource.save();
            }
            if (previousImage) {
              unlink(`/app/upload/${previousImage.path}`, async (err) => {
                if (err) {
                  console.error(err);
                }
                await previousImage.remove();
              });
            }
          }
          const image = new Image();
          image.name = fileName;
          image.path = `/ressourcesImages/${fileName}`;
          image.created_by_user = req.body.userId;
          const result = await image.save();
          res.json(result);
        } else {
          res.status(404).send({
            message: "Une erreur est survenue",
          });
        }
      } catch (error) {
        res.status(404).send({
          message: error,
        });
      }
    }
  );
  app.get("/download/:filename", customRESTAuthChecker, (req, res) => {
    const file = path.join(
      __dirname,
      "../upload/ressources",
      req.params.filename
    );
    res.download(file, (err) => {
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  });
}
