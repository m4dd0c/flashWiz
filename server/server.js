import { app } from "./App.js";
import { connectDB } from "./configs/connectDB.js";
import cloudinary from "cloudinary";
connectDB();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Server is Working...");
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.listen(port, () => {
  console.log("server is up on port:", port);
});
