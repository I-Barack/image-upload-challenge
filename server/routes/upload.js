import express from "express";
import {
  createUpload,
  deleteUpload,
  getSingleUpload,
  getUploads,
} from "../controllers/uploadControl.js";
import upload from "../middlewares/mutler.js";

const router = express.Router();

router.get("/", getUploads);

router.get("/:id", getSingleUpload);

router.post("/", upload.single("image"), createUpload);

router.delete("/:id", deleteUpload);

export default router;
