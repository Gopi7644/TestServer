import express from "express";

import { UserTwo } from "../model/user.model.js";
export const route = express.Router();

export const create = async (req, res) => {
  try {
    const body = req.body;
    // body.profileImage = req.file ? req.file.path : null;
    // body.profileImage = profileImage;
    console.log(body);
    const userData = new UserTwo(body);
    if (!userData) {
      res.status(404).json({ msg: "User data Not Found" });
    }
    const savedData = await userData.save();
    res.status(200).json({
      data: savedData,
      msg: "User created successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const usersData = await UserTwo.find();
    console.log("users data:",usersData);
    if (!usersData) {
      res.status(404).json({ msg: "Users data Not Found" });
    }
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const getById = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await UserTwo.findById(id);
        if(!userData){
            res.status(404).json({ msg: "User data Not Found" });
        }
        res.status(200).json(userData);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const update = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await UserTwo.findById(id)
        if(!userData){
            res.status(404).json({ msg: "User data Not Found" });
        }
        const updatedData = await UserTwo.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedData);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const deleteuser = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await UserTwo.findById(id);
        if(!userData){
            res.status(404).json({ msg: "User data Not Found" });
        }
        await UserTwo.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"});
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}