import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
// import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profileImage",
    format: async (req, file) => "png",
    
    public_id: (req, file) => {
      if (!file || !file.originalname) {
        throw new Error("Invalid file upload");
      }
      return file.originalname.split(".")[0] + "-" + Date.now(); // Ensure unique filename
    },
  },
});

export const upload = multer({ storage: storage });
export default cloudinary;
