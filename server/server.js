import "dotenv/config";

import express from "express";
import uploadRoutes from "./routes/upload.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  res.send("App is running...");
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/uploads", uploadRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB and running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
