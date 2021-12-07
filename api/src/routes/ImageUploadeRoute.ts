import { Router } from "express";
import { apiErrorHandler } from "../handlers/errorHandler";
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dd5goguui", //"YOUR_CLOUD_NAME",
  api_key: "841314466179189", //"YOUR_API_KEY",
  api_secret: "sDnq8nJ74W_Oi9zLsvSzzccOsGc", //"YOUR_API_SECRET",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

class CourseRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }
  intializeRoutes() {
    this.router.route("/").post(upload.single("picture"), async (req, res) => {
      try {
        //@ts-ignore
        return res.json({ profilePicUrl: req.file.path });
      } catch (error) {
        apiErrorHandler(error, req, res, "Fetch All Department failed.");
      }
    });
  }
}
export default new CourseRoutes().router;
