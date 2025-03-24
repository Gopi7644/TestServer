import express from "express";
import { create, deleteuser, getAll, getById, update } from "../controller/userController.js";

export const route = express.Router();

route.post("/create", create);

route.get("/getAll", getAll);

route.get("/getById/:id", getById);

route.put("/update/:id", update);

route.delete("/delete/:id", deleteuser)