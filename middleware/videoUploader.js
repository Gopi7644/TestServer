import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Multer Storage for Videos
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "videos", // Cloudinary में "videos" नाम का फोल्डर
    resource_type: "video", // 🎥 Cloudinary को Video Files के लिए सेट करें
    format: async (req, file) => "mp4", // Default format MP4 रखें
    public_id: (req, file) => {
      if (!file || !file.originalname) {
        throw new Error("Invalid file upload");
      }
      return file.originalname.split(".")[0] + "-" + Date.now();
    },
  },
});

// Multer Middleware
export const uploadVideo = multer({ storage });
export default cloudinary;