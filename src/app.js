
const express = require('express');
const connectDb = require('./config/database');
const app = express();
const { User } = require('./models/user.js');
app.use(express.json());

app.post('/signup',async(req,res)=>{
    //console.log(req.body)

   // creating the new instance of the User Model
   const user = new User(req.body);
  try{
   await user.save()
  res.send('User signed up successfully');
  }
  catch(err){
   res.status(400).send('Error signing up user', err.message);
  }
})


connectDb().then(()=>{
console.log('Connected to database successfully');
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
}).catch((err)=>{
    console.log('Error connecting to database', err);
})


