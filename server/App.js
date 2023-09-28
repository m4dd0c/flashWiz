import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
dotenv.config({ path: "./configs/local.env" });
export const app = express();

const corsOptions = {
  credentials: true,
};

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "./tmp",
//     limits: { fileSize: 50 * 1024 * 1024 }, //50mb
//   })
// );
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
    limits: { fileSize: 50 * 1024 * 1024 }, //50mb
  })
);
app.use(cookieParser());

//importing routes
import auth from "./routes/authRoute.js";
import admin from "./routes/adminRoute.js";
import cards from "./routes/cardRoute.js";
app.use("/api/v1/auth", auth);
app.use("/api/v1/admin", admin);
app.use("/api/v1/card", cards);

app.get("/api/v1/", (req, res) => {
  console.log("hehe");
  res.status(200).json({ success: true, msg: "server is working..." });
});
app.post("/api/v1/file", (req, res) => {
  const data = req.files;
  console.log(req.files, "data");
  res.status(200).json({ success: true });
});
// error middleware
app.use(errorMiddleware);
