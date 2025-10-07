
const express = require('express');
const app = express();

//app.use("/route", rH, [rH2, rH3], rH4, rh5);

// app.use('/',(err,req,res,next)=>{
//  if(err){
//    // Log the error 
//    res.status(500).send("Something went wrong")
//  }
// })

app.use('/getUserData',(req,res,next)=>{

  
   try{
      
  throw new Error("Some error occured")
   res.send("User data sent")
   }
   catch(err){
      if(err){
         res.status(500).send("Some error contact support team")
      }
   }
})

app.use('/',(err,req,res,next)=>{
 if(err){
   // Log the error 
   res.status(500).send("Something went wrong")
 }
})



// Handle Auth request for all the request [GET, POST, DELETE, UPDATE]



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})