const jwt=require('jsonwebtoken')
const checkAuth=(req,res,next)=>{

  const {authorization}=req.headers;
  if(authorization){
  try{
    const token=authorization.split(" ")[1];
   const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const {name,userId,phone}=decoded;

    req.name=name
    req.userId=userId
    req.phone=phone;
    next();
  }catch(err){
    next("Authentication Failure")
  }
}else{
  next("Authentication Failure")
}
}


module.exports=checkAuth;