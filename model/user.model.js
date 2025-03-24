import mongoose from "mongoose";

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
})


export const UserTwo = mongoose.model("UserTwo", usermodel)