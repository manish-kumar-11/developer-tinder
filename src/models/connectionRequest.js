const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
    ,
     toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:{
           values: ['ignored','interested','accepted','rejected'],
           message:'{VALUE} is incorrect status type'
        },
        required:true,
       
    }
},{timestamps:true})
connectionRequestSchema.index({fromUserId:1,toUserId:1},{unique:true})
// Pre-save hook to prevent sending connection request to oneself

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if the fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();
})

const ConnectionRequestModel = mongoose.model('ConnectionRequest',connectionRequestSchema)

module.exports = ConnectionRequestModel