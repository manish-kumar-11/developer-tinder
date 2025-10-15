const express = require('express');
const authRouter = express.Router();
const { User } = require('../models/user.js');
const {validateSignupData} = require('../utils/validations.js')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')


authRouter.post('/signup',async(req,res)=>{

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


authRouter.post('/login',async(req,res)=>{
    
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
            res.send(user);
        }
        else{
            throw new Error('Invalid Credentials');
        }
       
    }catch(err){
        res.status(500).send('Error while logging in the user' + err.message);
    }
})

authRouter.post('/logout',async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())})
    res.send('User logged out successfully');
})



module.exports = authRouter;