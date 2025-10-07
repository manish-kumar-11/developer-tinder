
const express = require('express');
const connectDb = require('./config/database');
const app = express();
const { User } = require('./models/user.js');


app.post('/signup',async(req,res)=>{
   const userObject = {
      firstName:'Virat',
      lastName:'Kohli',
      emailId:'virat@gmail.com',
      password:'virat@123',
      age:45,   
   }
   // creating the new instance of the User Model
   const user = new User(userObject);
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


