const express=require("express");
const path=require("path");
require("dotenv").config();
const cors=require("cors");

const app=express();
const port=process.env.PORT || 5000;
require("./db/connection");
app.use(express.json({limit:'50mb'}));

const Devices=require("./models/device");

app.use(express.urlencoded({extended:false}));

// const mongoose = require('mongoose')
// const DB='mongodb+srv://hardik3301:LdEHgXaKrLu9AqDY@cluster0.5t0ij.mongodb.net/smartgrid?retryWrites=true&w=majority'
// mongoose.connect(DB).then(()=>{
//   console.log("successful");
// }).catch((err)=>{console.log(err);});

app.use(cors());

app.get("/data",async(req,res)=>{
    try
  {
    const data = await Devices.find();

    //console.log(data);
    // for(var i=0;i<data.length;i++)
    // {
    //   res.write(data[i].device_id+" "+data[i].device_name+" "+data[i].private_key+"\n");
    // }
    // return json object with status 201 and data of all devices
    res.status(201).json({status:201,data:data});
    
  }
  catch(err)
  {
      console.log(err);

      // return json object with status 400
      res.status(201).json({status:400});
  }
  
})

app.post("/add",async(req,res)=>{
  try{
    const deviceId = req.body.deviceId;
    const deviceName = req.body.deviceName;

    // create a private_key
    const privateKey = 1;// to be changed

    // creating an object of Device
    const device = new Devices({
      device_id:deviceId,
      device_name:deviceName,
      privateKey:privateKey
    });

    // saving new device to database
    const result=await device.save();

    // return json object with status 201
    res.status(201).json({status:201});
  }
  catch(err)
  {
    console.log(err);
    // return json object with status 400
    res.status(201).json({status:400});
  }
})

app.post("/remove",async (req,res)=>{
  try{
    const deviceId = req.body.deviceId;
    
    // searching for device in database with given id
    const device = await Devices.findOne({device_id:deviceId});

    console.log("Going to delete device with group id "+device.group_id);

    // deleting device from database
    await Devices.deleteOne({device_id:deviceId});
    
    //return json object with status 201
    res.status(201).json({status:201});
  }
  catch(err)
  {
    console.log(err);
    
    // return json object with status 400
    res.status(201).json({status:400});
  }
})


app.listen(port,()=>{
    console.log(`listening at port number ${port}`);
  })