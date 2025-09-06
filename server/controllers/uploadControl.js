import Upload from "../models/uploadModel.js";
import { cloudinary } from "../utils/cloudinary.js";
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
};

const createUpload = async (req, res) => {
  // Post object
  try {
    //Post Image (file)
    const result = await cloudinary.uploader.upload(req.file.path);
    const upload = await Upload.create({
      name: result.original_filename,
      imageUrl: result.secure_url,
    });
    return res.status(201).json(upload, console.log(upload));
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(JSON.stringify(error));
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
