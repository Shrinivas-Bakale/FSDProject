const express = require("express");
const {
  create,
  deleteServiceById,
  getAllServices,
  getServiceById,
  updateServiceById,
} = require("../controllers/example.controller.js"); // Add .js extension

const router = express.Router();

router.post("/createService", create);
router.get("/getAllServices", getAllServices);
router.get("/getServiceById/:id", getServiceById);
router.put("/updateServiceById/:id", updateServiceById);
router.delete("/deleteServiceById/:id", deleteServiceById);

module.exports = router;
