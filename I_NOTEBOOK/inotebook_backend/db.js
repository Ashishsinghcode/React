const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://ashishsinghcode:7726525@mernstack.3pjfgna.mongodb.net/'

const connectToMongo =()=>{
    mongoose.connect(mongoURI)
    .then((res)=>{
        console.log("Connected to Mongo successfully")
    })
    .catch((err)=>{
        console.log(String(err))
    })
    }

module.exports = connectToMongo;