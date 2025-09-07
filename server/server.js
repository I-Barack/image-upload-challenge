import "dotenv/config";

import express from "express";
import uploadRoutes from "./routes/upload.js";
import dbConnect from "./configs/dbConnect.js";

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

dbConnect().then(() => {
  app.listen(PORT, () => {
    // console.log(`Connected to DB and running on port ${PORT}`);
  });
});
