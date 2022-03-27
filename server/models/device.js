require("dotenv").config();
const mongoose=require("mongoose");

// schema for Device 
const deviceSchema=new mongoose.Schema({
  
    
    device_id:{
      type: String,
      required: true
    },
    device_name:{
      type: String,
      required: true
    },
    private_key:{
      type: String,
      required: true
    },
      

})

// creating a mongoose model using device schema
const Devices=mongoose.model("device",deviceSchema);
// exporting device model
module.exports=Devices;