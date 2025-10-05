
const express = require('express');
const app = express();


app.get("/user",(req,res)=>{
    res.send({firstName:"Manish",lastName:"Kumar"});
})
app.post("/user",(req,res)=>{
   console.log("Post Request Called");
   res.send("Data has been posted to the server");
})

app.delete("/user",(req,res)=>{
   console.log("Delete Request Called");
   res.send("Data has been deleted from the server");
})

// this will match all the routes
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