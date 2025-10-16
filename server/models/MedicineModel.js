const mongoose = require("mongoose")
const MedicineModel = new mongoose.Schema({
    medicineName: {type: String, required: true},
    manufacturer: {type: String, required: true},
    quantityPerStripPac: {type: Number, required: true},
    mrpForEachQuantity: {type: Number, required: true},
    manufacturingDate: {type: Date, required: true},
    expiryDate: {type: Date, required: true},
    type: {type: String,enum: ["tablet" , "capsule" , "syrup" , "spray" , "injection" , "ointment"], required: true},
    availableQuantity: {type: Number, required: true}
},{versionKey: false})
MedicineModel.pre("save", async function(next) {
  if(this.isModified('manufacturingDate') || this.isModified('expiryDate')){
    if(this.expiryDate <= this.manufacturingDate){
      const error = new Error("Expiry date must be strictly after the manufacturing date")
      error.name="Validation Error"
      return next(error)
    }
  }
  next()
})
module.exports = mongoose.model("medicines",MedicineModel)