const validator = require('validator');

const validateSignupData = (req) => {
   const {firstName,lastName,emailId,password} = req.body
   if(!firstName || !lastName){
    throw new Error("First name and Last name are required")
   }
//    else if(firstName.length < 4 || firstName.length > 30){
//     throw new Error("First name must be between 4 and 30 characters")
//    }
else if(!validator.isEmail(emailId)){
    throw new Error("Invalid email address"+ emailId)

}
else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not strong enough" + password) 
}
}

const validateEditProfileData = (req)=>{
     const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
}

module.exports={validateSignupData,validateEditProfileData}
