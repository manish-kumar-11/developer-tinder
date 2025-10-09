const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth.js')


profileRouter.get('/profile',userAuth,async(req,res)=>{
    try{
   
  const user = req.user
    res.send(user);
}
catch(err){
  res.status(500).send('Error while fetching the user profile' + err.message);
}
})

module.exports = profileRouter