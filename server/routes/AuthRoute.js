const express = require("express");
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  forgotPassword
} = require("../controllers/AuthController");

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/forgot-password", forgotPassword);

module.exports = router;