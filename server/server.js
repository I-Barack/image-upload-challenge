import "dotenv/config";
import cors from "cors";

import express from "express";
import uploadRoutes from "./routes/upload.js";
import userRoutes from "./routes/user.js";
import dbConnect from "./configs/dbConnect.js";

const app = express();

app.get("/", (req, res) => {
  res.send("App is running...");
});

app.use(
  cors({
    origin: process.env.VERCEL_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoutes);

app.use("/api/uploads", uploadRoutes);

const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Connected to DB and running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});
