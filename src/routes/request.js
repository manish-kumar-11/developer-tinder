const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middlewares/auth.js')
requestRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    // sending the connection request
    const {firstName} = req.user
    res.send(firstName + 'Connection request sent successfully');
})

module.exports = requestRouter
