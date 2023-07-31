const mongoose = require('mongoose');
require('dotenv').config()
const connectToMongo =()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then((res)=>{
        console.log("Connected to Mongo successfully")
    })
    .catch((err)=>{
        console.log(String(err))
    })
    }

module.exports = connectToMongo;