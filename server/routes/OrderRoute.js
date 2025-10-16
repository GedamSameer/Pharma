const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateExistingOrder,
  deleteExistingOrder
} = require("../controllers/OrderController");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

// Validate ObjectId middleware
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid order ID" });
  }
  next();
};

// Routes
router.get("/orders", getAllOrders);
router.get("/orders/:id", validateObjectId, getOrderById);
router.post("/orders", upload.single("prescription"), createNewOrder);
router.put("/orders/:id", validateObjectId, updateExistingOrder);
router.delete("/orders/:id", validateObjectId, deleteExistingOrder);

module.exports = router;
