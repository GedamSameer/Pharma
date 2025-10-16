const mongoose = require("mongoose");
const OrderModel = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  doctorName: { type: String, required: true },
  dateOfOrder: { type: Date, required: true },
  prescription: { type: String, required: true }, // store image URL/path
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
  requiredQuantity: { type: Number, required: true },
}, { versionKey: false });
module.exports = mongoose.model("Order", OrderModel);