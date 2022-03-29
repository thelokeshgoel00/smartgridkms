const express=require("express");
const path=require("path");
require("dotenv").config();
const cors=require("cors");

const app=express();
const port=process.env.PORT || 5000;
require("./db/connection");
app.use(express.json({limit:'50mb'}));

const Devices=require("./models/device");
const Messages=require("./models/message");

app.use(express.urlencoded({extended:false}));

// const mongoose = require('mongoose')
// const DB='mongodb+srv://hardik3301:LdEHgXaKrLu9AqDY@cluster0.5t0ij.mongodb.net/smartgrid?retryWrites=true&w=majority'
// mongoose.connect(DB).then(()=>{
//   console.log("successful");
// }).catch((err)=>{console.log(err);});

app.use(cors());

// app.get("/",async(req,res)=>{
//   console.log(Math.floor((Math.random() * 10) + 1));
//   res.end();
// })

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
    // checking whether devideId already exists
    const data = await Devices.find({device_id:deviceId});

    if(data.length == 0)
    {

      const deviceName = req.body.deviceName;

      // create a private_key
      const privateKey = Math.floor((Math.random() * 10) + 1);// to be changed

      // creating an object of Device
      const device = new Devices({
        device_id:deviceId,
        device_name:deviceName,
        private_key:privateKey
      });

      // saving new device to database
      const result=await device.save();

      // return json object with status 201
      res.status(201).json({status:201});
    }
    else{

      res.status(201).json({status:400,err:"Duplicate device ID"});
    }
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

app.post("/send",async(req,res)=>{
  try{
    // id of sender
    const sender = req.body.sender;
    // receiver id
    const receiver = req.body.receiver;
    // message to be transmitted
    const text = req.body.message;

    // whether sender is a device or receiver
    let deviceName = "";
    if(sender.localCompare("smart meter")==0)
    {
      deviceName = receiver;
    }
    else{
      deviceName = sender;
    }

    // get actual private key
    const data = await Devices.findOne({device_name:deviceName});
    const key = data.private_key;

    // encrypt message
    for(var i=0;i<text.length;i++)
    {
      if(text[i] == text[i].toUpperCase()) // isUpperCase
      {
        text[i] = char(int(text[i]+key-65)%26 +65);
      } 
      else
      {
        text[i] = char(int(text[i]+key-97)%26 +97);
      }
    }

    // creating an object of Message
    const message = new Messages({
      receiver:receiver,
      message:text
    });

    // saving new device to database
    const result=await message.save();

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

app.post("/receiver",async(req,res)=>{
  try{  

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const prvtKey = req.body.privateKey;

    // Invalid private key
    if(!(prvtKey>=1&&prvtKey<=10))
    {
      // return json object with status 400
      res.status(201).json({status:400,err:"Invalid private key"});
    }

    // searching for latest message received by receiver
    let message = await Messages.findOne({sender:sender,receiver:receiver});   

    // whether sender is a device or receiver
    let deviceName = "";
    if(sender.localCompare("smart meter")==0)
    {
      deviceName = receiver;
    }
    else{
      deviceName = sender;
    }

    // get actual private key
    const data = await Devices.findOne({device_name:deviceName});
    const key = data.private_key;

    // decrypt the message
    if(key == prvtKey)
    {
      for(var i=0;i<message.length;i++)
      {
        if(message[i] == message[i].toUpperCase()) // isUpperCase
        {
          message[i] = char(int(message[i]-key-65+26)%26 +65);
        } 
        else
        {
          message[i] = char(int(message[i]-key-97+26)%26 +97);
        }
      }
    }
    else{
      // return encrypted message
    }

    // return json object with status 201
    res.status(201).json({status:201,data:message});

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