import express from "express";
import upload from "./config/multer.js";
import { sendToImageKit } from "./services/storage.service.js";

const app = express();

app.post("/getImg", upload.single("image"), async (req, res) => {
  let data = req.file;

  if (!data)
    return res.status(404).json({
      message: "File not found",
    });

  let uploadedImages = await sendToImageKit(data.buffer, data.originalname);
  console.log(uploadedImages);

  return res.status(201).json({
    message: "Image agyi..",
  });
});

export default app;
