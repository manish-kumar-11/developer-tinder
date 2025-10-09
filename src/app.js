
const express = require('express');
const connectDb = require('./config/database');
const app = express();
const { User } = require('./models/user.js');
const {validateSignupData} = require('./utils/validations.js')
const bcrypt = require('bcrypt')
app.use(express.json());
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const jwt = require('jsonwebtoken')
const {userAuth} = require('./middlewares/auth.js')


app.post('/signup',async(req,res)=>{

    // validations of the data
    try{
    validateSignupData(req)
    // Encrypt the password
    const {firstName,lastName,emailId,password} = req.body

    const passwordHash = await bcrypt.hash(password,10)
   
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
        const isPasswordValid = await user.validatePassword(password) // mongoose schema method
        if(isPasswordValid){
            // create the JWT token 
            const token = await user.getJwtToken() // mongoose schmma method
          


            // Add the token to the cookie and sent the response back to the user
            res.cookie("token",token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })
            res.send('User logged in successfully');
        }
        else{
            throw new Error('Invalid Credentials');
        }
       
    }catch(err){
        res.status(500).send('Error while logging in the user' + err.message);
    }
})


app.get('/profile',userAuth,async(req,res)=>{
    try{
   
  const user = req.user
    res.send(user);
}
catch(err){
  res.status(500).send('Error while fetching the user profile' + err.message);
}
})

app.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    // sending the connection request
    const {firstName} = req.user
    res.send(firstName + 'Connection request sent successfully');
})


connectDb().then(()=>{
console.log('Connected to database successfully');
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})
}).catch((err)=>{
    console.log('Error connecting to database', err);
})


