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
const { parse } = require("path");

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
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: __dirname+'/.env'});
}

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

      const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

      // create a private_key
      const privateKey = genRanHex(32); // 128 bit
      
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

    console.log(sender);
    console.log(receiver);
    console.log(text);

    // whether sender is a device or receiver
    let deviceId = "";
    if(sender==="smart meter")
    {
      deviceId = receiver;
    }
    else{
      deviceId = sender;
    }

    // get actual private key
    const data = await Devices.findOne({device_id:deviceId});

    // removing earlier messages with same sender receiver
    await Messages.deleteOne({sender:sender,receiver:receiver});
    
    const secretKey = (data.private_key); // from TTP
    let key = parseInt("0x"+secretKey.substring(0,8));
    //console.log(secretKey,key,typeof(key));
    let k1 =  parseInt("0x"+secretKey.substring(8,14));
    let k2 = parseInt("0x"+secretKey.substring(14,20));
    let k3 = parseInt("0x"+secretKey.substring(20,26))
    let key1 = k1^k2^k3;
    
    let x = key1/parseInt("0x"+"eeeeee"); //seed for chaotic encryption
    const initial_seed = x;
    const key2 = parseInt("0x"+secretKey.substring(26,32));
    // control paramter random fron 1.5 to 10 for every msg
    const control_param = ((key2/parseInt("0x"+"eeeeee"))*8.5)+1.5;
    //console.log(Math.random*8);

    let cypherText = "";

    // encrypt message
    for(var i=0;i<text.length;i++)
    {

      // chaotic encryption
      const r = control_param;
      x = Math.abs(Math.sin(Math.PI*Math.cos(Math.PI*r*x/2)*Math.pow(r,15) * (1-x)));
      
      const prvtKey = (key * x)%256;

      cypherText += String.fromCharCode(text.charCodeAt(i) ^ prvtKey);
      //console.log(" control param-> "+control_param+" X-> "+x+" prvtkey-> "+prvtKey+"cypher text-> "+cypherText);
    }

    // creating an object of Message
    const message = new Messages({
      sender:sender,
      receiver:receiver,
      message:cypherText
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

app.post("/receive",async(req,res)=>{
  try{  

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    console.log(sender);
    console.log(receiver);
    const secretKey = req.body.privateKey;
    
    let prvtKey = parseInt("0x"+secretKey.substring(0,8));
    //console.log(secretKey,key,typeof(key));
    let k1 =  parseInt("0x"+secretKey.substring(8,14));
    let k2 = parseInt("0x"+secretKey.substring(14,20));
    let k3 = parseInt("0x"+secretKey.substring(20,26));
    let key1 = k1^k2^k3;
    
    let initial_seed = key1/parseInt("0x"+"eeeeee"); //seed for chaotic encryption
    const key2 = parseInt("0x"+secretKey.substring(26,32));
    // control paramter random fron 1.5 to 10 for every msg
    const control_param = ((key2/parseInt("0x"+"eeeeee"))*8.5)+1.5;
    
    // searching for latest message received by receiver
    const message = await Messages.findOne({sender:sender,receiver:receiver});  
    
    const text = message.message;
    console.log("encrypted message-> "+text);
    
    let plainText = "";

    // whether sender is a device or receiver
    let deviceId = "";
    if(sender==="smart meter")
    {
      deviceId = receiver;
    }
    else{
      deviceId = sender;
    }

    // decrypt the message
    
    let x = initial_seed;

    // chaotic decryption
    for(var i=0;i<text.length;i++)
    {
      // chaotic map
      const r = control_param;
      x = Math.abs(Math.sin(Math.PI*Math.cos(Math.PI*r*x/2)*Math.pow(r,15) * (1-x)));
  
      const prvtKey1 = (prvtKey * x)%256;
      plainText += String.fromCharCode(text.charCodeAt(i) ^ prvtKey1);
      console.log(plainText);
      
    }
    

    // return json object with status 201
    res.status(201).json({status:201,data:plainText});
    

  }
  catch(err)
  {
    console.log(err);
    
    // return json object with status 400
    res.status(400).json({status:400});
  }
})

// static files (build of your frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', '../build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../', '../build', 'index.html'));
  })
}


app.listen(port,()=>{
    console.log(`listening at port number ${port}`);
  })