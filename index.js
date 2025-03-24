import { route } from "./routers/userRoute.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import multer from "multer";
// const upload = multer();

const app = express();
// app.use(upload.none());
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;

mongoose
  .connect(DBURL)
  .then(() => {
    console.log("✅ Database Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server started at ${PORT}`));
  })
  .catch((err) => console.log(err));

app.use("/api", route);
