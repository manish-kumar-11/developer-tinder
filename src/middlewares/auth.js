const adminAuth= (req,res,next)=>{
   // Logic to check if the request is authorized or not
   const token = "xyz"
   const isAdminAuthorised = token === "xyz"
   if(!isAdminAuthorised){
      return res.status(403).send("Not Authorized")
   }
   else{
      next();
   }
}

const userAuth= (req,res,next)=>{
   // Logic to check if the request is authorized or not
   const token = "xyz"
   const isAdminAuthorised = token === "xyzabc"
   if(!isAdminAuthorised){
      return res.status(403).send("Not Authorized")
   }
   else{
      next();
   }
}


module.exports={adminAuth,userAuth}