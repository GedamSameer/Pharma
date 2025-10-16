const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/authenticationMiddleware")
const {getAllCustomers,getCustomerById,createNewCustomer,updateExistingCustomer,deleteExistingCustomer} = require("../controllers/CustomerController")
const { default: mongoose } = require("mongoose")
const validateObjectId = (req,res,next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({erro: "Invalid Customer Id"})
    }
}
router.get("/customers",verifyToken,getAllCustomers)
router.get("/customers/:id",validateObjectId,getCustomerById)
router.post("/customers",createNewCustomer)
router.put("/customers/:id",validateObjectId,updateExistingCustomer)
router.delete("/customers/:id",validateObjectId,deleteExistingCustomer)
module.exports = router