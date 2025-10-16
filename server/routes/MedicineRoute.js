const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authenticationMiddleware");
const authorizeRole = require("../middlewares/authorizationMiddleware")
const mongoose = require("mongoose");
const {
  getAllMedicines,
  searchMedicines,
  getMedicineById,
  createNewMedicine,
  updateExistingMedicine,
  deleteExistingMedicine
} = require("../controllers/MedicineController");

// Validate ObjectId middleware
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid medicine ID" });
  }
  next();
};

// Routes
router.get("/medicines",getAllMedicines);
router.get("/search-medicines",searchMedicines)
router.get("/medicines/:id", validateObjectId, getMedicineById);
router.post("/medicines",verifyToken,authorizeRole(),createNewMedicine);
router.put("/medicines/:id", validateObjectId, updateExistingMedicine);
router.delete("/medicines/:id", validateObjectId, deleteExistingMedicine);

module.exports = router;