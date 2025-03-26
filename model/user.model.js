import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const usermodel = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    pass:{
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    public_id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    video: {
        type: String,
        unique: true
    }
},{timestamps: true})

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true } // ✅ Cloudinary से आया Video URL
}, { timestamps: true });

export const Video = mongoose.model("Video", videoSchema);


export const UserTwo = mongoose.model("UserTwo", usermodel)