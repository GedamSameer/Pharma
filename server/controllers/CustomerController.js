const bcrypt = require("bcrypt")
const Customer = require("../models/CustomerModel");

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const allCustomers = await Customer.find({});
    return res.status(200).json(allCustomers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json(customer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Create new customer
exports.createNewCustomer = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    const customer = new Customer({
      ...otherData,
      password: hashedPassword
    });

    await customer.save();
    return res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

// Update existing customer
exports.updateExistingCustomer = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

    if (!customer) return res.status(404).json({ error: "Customer not found" });
    return res.status(200).json(customer);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

// Delete existing customer
exports.deleteExistingCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};