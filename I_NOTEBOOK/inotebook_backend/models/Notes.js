const { default: mongoose } = require('mongoose');
const mongo = require('mongoose');

const NotesSchema = new mongo.Schema({
   user:{
    type:mongo.Schema.Types.ObjectId,
    ref:'user',
    required:true
   },   
   title:{
    type:String,
    required:true
   },   
   description:{
    type:String,
    required:true,
   },
   tag:{
    type:String,
    default:"General"
   },
   date:{
    type:Date,
    default:Date.now
   },
  });

  module.exports = mongoose.model('notes',NotesSchema)