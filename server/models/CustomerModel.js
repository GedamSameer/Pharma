const mongoose = require("mongoose")
const CustomerModel = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    contact: {type: String, required: true},
    gender: {type: String,enum:["Male","Female","Trans"], required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    ansOfQue1: {type: String, required: true},
    ansOfQue2: {type: String, required: true},
    ansOfQue3: {type: String, required: true},
    isAdmin: {type: Boolean,default: false}
},{versionKey: false})
module.exports = mongoose.model("customers",CustomerModel)