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
    profileImage:{
        type: String,
    },
    public_id: {
        type: String,
        default: uuidv4,
        unique: true
    }
},{timestamps: true})


export const UserTwo = mongoose.model("UserTwo", usermodel)