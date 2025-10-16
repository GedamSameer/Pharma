const Order = require("../models/OrderModel");
const Medicine = require("../models/MedicineModel");

// Create new order with prescription upload
exports.createNewOrder = async (req, res) => {
  try {
    const { medicine: medicineId, requiredQuantity, patientName, age, doctorName, dateOfOrder } = req.body;

    if (!req.file) return res.status(400).json({ error: "Prescription image is required" });

    const prescriptionPath = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; 

    // Check if medicine exists and has enough stock
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    if (medicine.availableQuantity < requiredQuantity) {
      return res.status(400).json({ error: "Insufficient stock available" });
    }

    // Reduce stock
    medicine.availableQuantity -= requiredQuantity;
    await medicine.save();

    // Save order
    const order = new Order({
      patientName,
      age,
      doctorName,
      dateOfOrder,
      prescription: prescriptionPath, 
      medicine: medicineId,
      requiredQuantity
    });
    await order.save();
    return res.status(201).json(order);

  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("medicine");
    return res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("medicine");
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Update existing order
exports.updateExistingOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

// Delete order
exports.deleteExistingOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
