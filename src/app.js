
const express = require('express');
const app = express();
const {adminAuth, userAuth} = require('./middlewares/auth.js')
//app.use("/route", rH, [rH2, rH3], rH4, rh5);




// Handle Auth request for all the request [GET, POST, DELETE, UPDATE]

app.use('/admin',adminAuth)

app.get('/admin/getAllData',(req,res)=>{

   res.send("All Data Sent")



})

app.delete('/admin/getAllData',(req,res)=>{

   res.send("Data is deleted successfully")



})

app.post('/user/login',(req,res)=>{

   res.send("User Logged In Successfully")      
})

app.use('/user',userAuth,(req,res,next)=>{
   console.log("User Route is being accessed");
  res.send("User Route Accessed")
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})