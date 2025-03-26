import express from "express";
import { upload } from "../middleware/fileUploader.js";
import { UserTwo, Video } from "../model/user.model.js";

import { create, deleteuser, getAll, getById, update } from "../controller/userController.js";
import { uploadVideo } from "../middleware/videoUploader.js";


export const route = express.Router();
// cloudinaryFileUpload.single("file"),
route.post("/create", create);
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
      res.status(201).json({ message: "Image uploaded successfully", user: newUser });
      
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
          videoUrl: req.file.path // ✅ Cloudinary से आया Video URL
      });

      await newVideo.save();

      res.status(201).json({
          message: "Video uploaded successfully",
          video: newVideo
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

route.get("/getAll", getAll);

route.get("/getById/:id", getById);

route.put("/update/:id", update);

route.delete("/delete/:id", deleteuser)