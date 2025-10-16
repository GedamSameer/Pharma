const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(process.env.MONGO_URL,{})
const connection = mongoose.connection
connection.on("connected",() => {
    console.log("connection to MongoDb is successfull")
})