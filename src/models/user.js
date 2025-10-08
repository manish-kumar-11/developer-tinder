const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:30
    },
    lastName:{
        type:String,
       
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
  if(!validator.isEmail(value)){
    throw new Error("invalid email address"+value)
  }
        }
    },
    password:{
        type:String,
        required:true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough" + value)
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Filled Data(Gender) is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png",
          validate(value){
  if(!validator.isURL(value)){
    throw new Error("invalid photo url address"+value)
  }
        }
    },
    about:{
        type:String,
        default:"This is default about section"
    },
    skills:{
        type:[String],
    }
},{timestamps:true})

const User = mongoose.model('User', userSchema);
module.exports = {User};