import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ **Cloudinary Config**
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ✅ **इमेज स्टोरेज**
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profileImage",
    format: async () => "png",
    public_id: (req, file) => file.originalname.split(".")[0] + "-" + Date.now(),
  },
});

// ✅ **वीडियो स्टोरेज**
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "videos",
    resource_type: "video", // 🎥 वीडियो के लिए स्पेशल सेटिंग
    format: async () => "mp4",
    public_id: (req, file) => file.originalname.split(".")[0] + "-" + Date.now(),
  },
});

// ✅ **Multer Middleware (Image + Video दोनों के लिए)**
const storage = multer.memoryStorage(); // ✅ Buffer में Store करें

const upload = multer({ storage: storage });

 const imageWithVideoUploader = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "video", maxCount: 1 },
]); 

export { imageWithVideoUploader, cloudinary };
