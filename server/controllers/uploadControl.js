import Upload from "../models/uploadModel.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

const getUploads = async (req, res) => {
  const uploads = await Upload.find({}).sort({ createdAt: -1 });
  res.status(200).json(uploads);
};

const getSingleUpload = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.IsValid(id)) {
    return res.status(402).json({ error: "Image does not exist" });
  }

  const upload = await Upload.findById(id);

  if (!upload) {
    return res.status(402).json({ error: "Image does not exist" });
  }
  return res.status(201).json(upload);
};

const createUpload = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileBase64 = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileBase64, {
      resource_type: "auto",
      folder: "uploads",
    });

    const sanitizedName = (
      result.original_filename || req.file.originalname
    ).replace(/[^a-zA-Z0-9.-]/g, "_");

    const upload = await Upload.create({
      name: sanitizedName,
      imageUrl: result.secure_url,
    });

    console.log("Upload created:", upload);
    return res.status(201).json(upload);
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    console.error("Upload error:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(statusCode).json({ error: "Failed to upload file" });
  }
};

const deleteUpload = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(402).json({ error: "Image does not exist" });
  }

  const upload = await Upload.findOneAndDelete({ _id: id });

  if (!upload) {
    return res.status(400).json({ error: "Image does not exist" });
  }

  res.status(200).json(upload);
};

export { createUpload, getSingleUpload, getUploads, deleteUpload };
