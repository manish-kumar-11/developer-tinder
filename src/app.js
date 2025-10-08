
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
   res.status(400).send('Error signing up user' + err.message);
  }
})

// Get user by email

app.get('/user',async(req,res)=>{
    const email = req.body.emailId
    try{
 
  const user  = await User.find({emailId:email})
  if(user.length===0){
    return res.status(404).send('User not found');
  }
  else{
res.send(user)
  }
  ;
    }
    catch(err){
        res.status(500).send('Error fetching while extracting the particular user', err.message);
    }
})
// Feed Api get feed get all the user from the database
app.get('/feed',async(req,res)=>{
    try{
        const users = await User.find({})
        if(!users){
             res.status(404).send('No users found');
        }
        else{
res.send(users)
        }
        
    }
    catch(err){
        res.status(500).send('Error fetching users', err.message);
    }
})

app.delete('/user',async(req,res)=>{
    const userId = req.body.userId
    try{
        const user = await User.findByIdAndDelete(userId)
       res.send('User deleted successfully');

    }catch(err){
 res.status(500).send('Error while deleting the  users', err.message);
    }
})

// update data of the user
app.patch('/user',async(req,res)=>{
    const userId = req.body.userId
    const data = req.body
    try{
     const user = await User.findByIdAndUpdate({_id:userId},data,{new:true,runValidators:true})
     res.send('User updated successfully');
    }
    catch(err){
        res.status(500).send('Error while updating the  users', err.message);
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


