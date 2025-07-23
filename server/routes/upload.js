import express from "express";
import { createUpload, getUploads } from "../controllers/uploadControl.js";
import upload from "../middlewares/mutler.js";

const router = express.Router();

router.get("/", getUploads);

router.post("/", upload.single("image"), createUpload);

export default router;
