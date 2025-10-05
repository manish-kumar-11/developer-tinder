
const express = require('express');
const app = express();
app.use("/",(req,res)=>{
   res.send("Welcome to the home page");
})
app.use("/hello",(req,res)=>{
   res.send("Hello Hello Hello");
})
app.use("/test",(req,res)=>{
   res.send("Hello From the server");
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})