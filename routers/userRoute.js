import express from "express";
import { upload } from "../middleware/fileUploader.js";
import { UserTwo, Video } from "../model/user.model.js";
import streamifier from "streamifier";

import {
  create,
  deleteuser,
  getAll,
  getById,
  update,
} from "../controller/userController.js";
import { uploadVideo } from "../middleware/videoUploader.js";
import { imageWithVideoUploader, cloudinary } from "../middleware/imageVideoUploader.js";

export const route = express.Router();
// cloudinaryFileUpload.single("file"),

route.post("/create", create);

route.get("/getAll", getAll);

route.get("/getById/:id", getById);

route.put("/update/:id", update);

route.delete("/delete/:id", deleteuser);

route.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploaded File:", req.file);

    const newUser = new UserTwo({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      pass: req.body.pass,
      image: req.file.path, // Save Cloudinary URL in MongoDB
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "Image uploaded successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Video Upload API
route.post("/upload-video", uploadVideo.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    console.log("Uploaded Video:", req.file);

    // नया Video डेटा MongoDB में Save करें
    const newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.file.path, // ✅ Cloudinary से आया Video URL
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ **इमेज + वीडियो अपलोड API**
route.post("/uploads", imageWithVideoUploader, async (req, res) => {
  try {
    console.log("🔍 Uploaded Files:", req.files); // Debugging

    const { fname, lname, email, pass } = req.body;

    if (!req.files || (!req.files.image && !req.files.video)) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let imageUrl = "";
    let videoUrl = "";

    // ✅ **Cloudinary पर इमेज अपलोड करें (Buffer से)**
    if (req.files.image) {
      const imageBuffer = req.files.image[0].buffer;
      imageUrl = await uploadBufferToCloudinary(imageBuffer, "profileImage", "image");
    }

    // 🎥 **Cloudinary पर वीडियो अपलोड करें (Buffer से)**
    if (req.files.video) {
      const videoBuffer = req.files.video[0].buffer;
      videoUrl = await uploadBufferToCloudinary(videoBuffer, "videos", "video");
    }

    // ✅ **MongoDB में डेटा सेव करें**
    const newUser = new UserTwo({
      id: new Date().getTime(),
      fname,
      lname,
      email,
      pass,
      image: imageUrl,
      video: videoUrl,
    });

    await newUser.save();
    res.status(201).json({ message: "Files uploaded successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ **Helper Function: Buffer से Cloudinary पर अपलोड करने के लिए**
async function uploadBufferToCloudinary(buffer, folder, resourceType) {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}
