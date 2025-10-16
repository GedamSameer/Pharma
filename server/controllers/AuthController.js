const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config
const Customer = require("../models/CustomerModel");

// ✅ Register a new customer
exports.registerCustomer = async (req, res) => {
  try {
    const { email, password, ...otherData } = req.body;

    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer)
      return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new Customer({
      ...otherData,
      email,
      password: hashedPassword,
    });

    await customer.save();
    return res.status(201).json({ message: "Registration successful", customer });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Login customer
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({id: customer._id,role: customer.isAdmin},process.env.jwt_secret,{expiresIn: "1d"})
    return res.status(200).json({message:"Login successful",token,customer});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Forgot password using 3 security answers
exports.forgotPassword = async (req, res) => {
  try {
    const { email, ansOfQue1, ansOfQue2, ansOfQue3, newPassword } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) return res.status(404).json({ error: "User not found" });

    // Compare all 3 answers
    if (
      customer.ansOfQue1 !== ansOfQue1 ||
      customer.ansOfQue2 !== ansOfQue2 ||
      customer.ansOfQue3 !== ansOfQue3
    ) {
      return res.status(400).json({ error: "Security answers are incorrect" });
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    customer.password = hashedPassword;
    await customer.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};