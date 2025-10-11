const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth.js')
const ConnectionRequest = require('../models/connectionRequest.js');
const { User } = require('../models/user.js');

// send the connection request
requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{ // status -  ignored interested
    // sending the connection request
   try{
   const fromUserId = req.user._id
   const toUserId = req.params.toUserId
   const status = req.params.status

   const isAllowedStatus = ['ignored','interested']
    if(!isAllowedStatus.includes(status)){
        return res.status(400).json({mesaage:`Invalid status value ${status}`})  

    }

    // check to userId is exit in DB or not

    const toUser = await User.findById(toUserId) // User model
    if(!toUser){
        return res.status(404).json({message:'The user you are trying to connect is not found'})
    }

    // If there is an existing connection request
    const existingRequest = await ConnectionRequest.findOne({
        $or:[
            {fromUserId:fromUserId,toUserId:toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
    })

    if(existingRequest){
        return res.status(400).json({message:'Connection request already exists'})
    }

   const connectionRequest = new ConnectionRequest({
    fromUserId,
    toUserId, 
    status
   })
   const data = await connectionRequest.save()
   res.send({"message":req.user.firstName + " is " + status + " in " + toUser.firstName,data})

   }catch(err){
    res.status(400).send('Error:' + err.message);
   }
})

module.exports = requestRouter
