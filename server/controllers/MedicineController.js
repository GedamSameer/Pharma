const Medicine = require("../models/MedicineModel");

// Get all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    return res.status(200).json(medicines);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
//Search medicine to Order
exports.searchMedicines= async (req,res) => {
  try{
    const search = req.query.search || "";
    const query = search ? {medicineName: {$regex:search,$options:"i"}} : {};
    const medicines = await Medicine.find(query).limit(10)
    res.status(200).json(medicines);
  }catch(err){
    return res.status(500).json({error:"Server error"})
  }
}
// Get medicine by ID
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    return res.status(200).json(medicine);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// Create new medicine
exports.createNewMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    return res.status(201).json(medicine);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

// Update existing medicine
exports.updateExistingMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    return res.status(200).json(medicine);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};

// Delete medicine
exports.deleteExistingMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    return res.status(200).json({ message: "Medicine deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
