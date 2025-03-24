import { User } from "../model/user.model.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      res.status(404).json({ msg: "User data Not Found" });
    }
    const savedData = await userData.save();
    res.status(200).json(savedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const usersData = await User.find();
    if (!usersData) {
      res.status(404).json({ msg: "Users data Not Found" });
    }
    res.status(200).json(usersData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findById(id);
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
        const userData = await User.findById(id)
        if(!userData){
            res.status(404).json({ msg: "User data Not Found" });
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new: true});
        res.status(200).json(updatedData);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const deleteuser = async (req, res) => {
    try{
        const id = req.params.id;
        const userData = await User.findById(id);
        if(!userData){
            res.status(404).json({ msg: "User data Not Found" });
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"});
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}