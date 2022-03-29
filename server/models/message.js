require("dotenv").config();
const mongoose=require("mongoose");

// schema for Message 
const messageSchema=new mongoose.Schema({
  
    sender:{
      type: String,
      required: true
    },
    receiver:{
      type: String,
      required: true
    },
    message:{
      type: String,
      required: true
    }
      

})

// creating a mongoose model using device schema
const Messages=mongoose.model("message",messageSchema);
// exporting device model
module.exports=Messages;