import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uploadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (url) => /\.(jpg|jpeg|png|gif)$/i.test(url),
        message:
          "Can only upload images with jpg, jpeg, png, or gif extensions",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Upload", uploadSchema);
