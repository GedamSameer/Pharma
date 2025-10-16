const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
require("./db")
require("dotenv").config()
const CustomerRoute = require("./routes/CustomerRoute")
const MedicineRoute = require("./routes/MedicineRoute")
const OrderRoute = require("./routes/OrderRoute")
const AuthRoute = require("./routes/AuthRoute")
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}))
app.options(/.*/,cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/auth",AuthRoute)
app.use("/api",CustomerRoute)
app.use("/api",MedicineRoute)
app.use("/api",OrderRoute)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3001,() => {
    console.log("Server is running on port: 3001")
})