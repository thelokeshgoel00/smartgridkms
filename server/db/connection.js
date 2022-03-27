const mongoose=require("mongoose");


const db=`mongodb+srv://hardik3301:LdEHgXaKrLu9AqDY@cluster0.5t0ij.mongodb.net/smartgrid?retryWrites=true&w=majority`;
mongoose.connect(db,{
  
}).then((data)=>{
    //console.log(data);
  console.log("online connection Successful...");
}).catch((err)=>{
    console.log(err);
  console.log("online connection faild....");
})
