import express from "express";
import {
  create,
  getAllServices,
  getServiceById,
  updateServiceById,
} from "../controllers/example.controller.js"; // Add .js extension

const router = express.Router();

router.post("/create", create);
router.get("/getAllServices", getAllServices);
router.get("/getServiceById/:id", getServiceById);
router.put("/updateServiceById/:id", updateServiceById);

export default router;
