import multer from "multer";
import { Express } from "express";
import { Image } from "./entities/Image";
import { User } from "./entities/User";
import { Group } from "./entities/Group";
import { File } from "./entities/File";
import { Ressource } from "./entities/Ressource";


export function initializeRoutes(app: Express) {
  const acceptedAvatarMimeType = ["image/jpg", "image/png", "image/jpeg"];
  const acceptedFileMimeType = ["image/jpg", "image/png", "image/jpeg"];

  const avatarStorage = multer.diskStorage({
    destination: "/app/upload/avatar",
    filename: function (req, file, cb) {
      const filename = file.originalname.split(".");
      const mimetype = file.mimetype.split("/");
      cb(null, Date.now() + "_" + filename[0] + "." + mimetype[1]);
    },
  });

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

  const uploadRessourcesDirectory = multer({ storage: ressourcesStorage,
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
    "/api/upload/avatar",
    uploadAvatarDirectory.single("file"),
    async (req, res) => {
      try {
        if (req.file && req.body.userId) {
          const user = await User.findOneBy({ id: req.body.userId });
          if(!user){
            res.status(404).send({
              message: "utilisateur introuvable",
            });
          } else {
          const image = new Image();
          image.name = req.file.originalname;
          image.path = req.file.path;
          image.created_by_user = req.body.userId;
          const result = await image.save();
          user.avatar = result;
          await user.save();
          res.json(result);
          } 
        } else {
          res.status(404).send({
            message: "Une erreur est survenue",
          });
        }
      } catch (error) {
        throw new Error("une erreur est survenue !");
      }
    }
  );

  app.post(
    "/api/upload/file",
    uploadRessourcesDirectory.single("file"),
    async (req, res) => {
      try {
        if (req.file && req.body.userId) {
          const user = await User.findOneBy({ id: req.body.userId });
          if(!user){
            res.status(404).send({
              message: "utilisateur introuvable",
            });
          }
          const file = new File();
          file.name = req.file.originalname;
          file.type = req.file.mimetype
          file.path = req.file.path;
          file.created_by_user = req.body.userId;
          const result = await file.save();
          res.json(result);
        } else {
          res.status(400).send({
            message: "Une erreur est survenue",
          });
        }
      } catch (error) {
        throw new Error("une erreur est survenue !");
      }
      
    }
  );

  
}





