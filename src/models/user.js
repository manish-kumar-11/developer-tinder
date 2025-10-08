const mongoose = require('mongoose');

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
        trim:true
    },
    password:{
        type:String,
        required:true,
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
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
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