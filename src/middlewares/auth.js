const jwt = require('jsonwebtoken')
const {User} = require('../models/user.js')
const userAuth= async(req,res,next)=>{
   // Read the token ffrom the request cookies validate the token find the user
 try{
 const cookies = req.cookies;
   const {token} = cookies;
   if(!token){
      throw new Error('Invalid Token');
   }
   const decodedMessage = await jwt.verify(token,"dev@tinder$70")
   const {_id} = decodedMessage
   const user  = await User.findById(_id)
   if(!user){
       throw new Error('User not found');
   }
   req.user = user
   next()
 }
 catch(err){
   res.status(400).send('Error:::' + err.message);
 }
  

  
}


module.exports={userAuth}