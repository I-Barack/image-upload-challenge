import Upload from "../models/uploadModel.js";
import { cloudinary } from "../utils/cloudinary.js";

const getUploads = async (req, res) => {
  const uploads = await Upload.find({}).sort({ createdAt: -1 });
  res.status(200).json(uploads);
};

// getSingleUpload = async (req, res) => {
//   const { id } = req.params;
// };

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

export { createUpload, getUploads };
