const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');

const UserSchema = new mongo.Schema({
   name:{
    type:String,
    required:true
   },   
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true
   },
   date:{
    type:Date,
    default:Date.now
   },
  });

  module.exports = mongoose.model('user',UserSchema)