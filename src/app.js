
const express = require('express');
const connectDb = require('./config/database');
const app = express();
const { User } = require('./models/user.js');
const {validateSignupData} = require('./utils/validations.js')
const bcrypt = require('bcrypt')
app.use(express.json());

app.post('/signup',async(req,res)=>{

    // validations of the data
    try{
    validateSignupData(req)
    // Encrypt the password
    const {firstName,lastName,emailId,password} = req.body

    const passwordHash = await bcrypt.hash(password,10)
    console.log(passwordHash)
    //console.log(req.body)

   // creating the new instance of the User Model
   const user = new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash,
    
   });
  
   await user.save()
  res.send('User signed up successfully');
  }
  catch(err){
   res.status(400).send('Error:' + err.message);
  }
})


app.post('/login',async(req,res)=>{
    
    try{
        const {emailId,password} = req.body
        const user = await User.findOne({emailId:emailId})
        if(!user){
           throw new Error('Invalid Credentials')
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(isPasswordValid){
            res.send('User logged in successfully');
        }
        else{
            throw new Error('Invalid Credentials');
        }
       
    }catch(err){
        res.status(500).send('Error while logging in the user' + err.message);
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
        const allowedUpdates = ['userId','photoUrl','about','skills','gender','age']
    const isUpdateAllowed = Object.keys(data).every((k)=>allowedUpdates.includes(k))
    if(!isUpdateAllowed){
       throw new Error('Invalid updates! Allowed updates are ' + allowedUpdates)
    }
    if(data?.skills?.length > 10){
        throw new Error('Skills cannot be more than 10')
    }
     const user = await User.findByIdAndUpdate({_id:userId},data,{new:true,runValidators:true})
     res.send('User updated successfully');
    }
    catch(err){
        res.status(500).send('Error while updating the  users' + err.message);
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


