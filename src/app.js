
const express = require('express');
const app = express();
//app.use("/route", rH, [rH2, rH3], rH4, rh5);
app.use('/user',[(req,res,next)=>{
   // route handler
console.log('Route handler 1')
//res.send('Response from route handler 1')
next()
//res.send('Response from route handler 1')
},
// route handler 2
(req,res,next)=>{
   console.log('Route handler 2')
  res.send('Response from route handler 2')
},
(req,res,next)=>{
   console.log('Route handler 3')
  res.send('Response from route handler 3')
},
(req,res,next)=>{
   console.log('Route handler 4')
  res.send('Response from route handler 4')
}]
)

// app.get("/user/:userId",(req,res)=>{
//     console.log(req.params);
//     console.log(req.query)
//     res.send({firstName:"Manish",lastName:"Kumar"});
// })
// app.post("/user",(req,res)=>{
//    console.log("Post Request Called");
//    res.send("Data has been posted to the server");
// })

// app.delete("/user",(req,res)=>{
//    console.log("Delete Request Called");
//    res.send("Data has been deleted from the server");
// })

// // this will match all the routes
// // app.use("/",(req,res)=>{
// //    res.send("Welcome to the home page");
// // })
// app.use("/hello",(req,res)=>{
//    res.send("Hello Hello Hello");
// })
// app.use("/test",(req,res)=>{
//    res.send("Hello From the server");
// })
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})