import multer from "multer";
import { Express } from "express";
import { Image } from "./entities/Image";
import { User } from "./entities/User";
import sharp from "sharp";
import mime from "mime-types";

export function initializeRoutes(app: Express) {
  const acceptedAvatarMimeType = ["image/jpg", "image/png", "image/jpeg"];

  const avatarStorage = multer.memoryStorage();

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

  const uploadRessourcesDirectory = multer({ storage: ressourcesStorage });

  app.post(
    "/upload/avatar",
    uploadAvatarDirectory.single("file"),
    async (req, res) => {
      try {
        const user = await User.findOneBy({ id: req.body.userId });
        if (req.file && req.file.mimetype.startsWith("image/") && user) {
          const extension = mime.extension(req.file.mimetype);
          const fileName = `${Date.now()}-U${user.id}-${
            req.file.originalname
          }.${extension}`;
          await sharp(req.file.buffer)
            .resize(150, 150, { fit: "contain" })
            .toFile(`/app/upload/avatar/${fileName}`);
          console.log(req.file);
          const image = new Image();
          image.name = fileName;
          image.path = `/app/upload/avatar/${fileName}`;
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
    "/api/upload/ressources",
    uploadRessourcesDirectory.single("file"),
    (req, res) => {
      /* console.log(req.body.userId); */
      res.json({ success: true });
    }
  );
}
