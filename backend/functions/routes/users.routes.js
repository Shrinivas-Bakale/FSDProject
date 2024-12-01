import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:id", getUserById);

export default router;
