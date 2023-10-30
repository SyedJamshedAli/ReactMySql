const User=require('../model/User')
 const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
//require('dotenv').config();

  const handleLogin= async (req,res)=>{
    console.log(req.body);
const {email,pwd}=req.body;
console.log(`${email} - ${pwd}`);
if (!email || !pwd) return res.status(400).json({"message":"user and pwd is required"})
  
const userExist=await User.findOne({username:email.toString()}).exec();
if (!userExist) return res.sendStatus(401);// unauthorized

console.log(pwd.toString());

console.log(userExist.password);

//check password
 const match= await bcrypt.compare(pwd.toString(),userExist.password);

if (match){

  const roles=Object.values(userExist.roles);

    //create JWTs
    const accessToken=jwt.sign(
        {"userInfo":{
                  "username":userExist.email,
                  "roles":roles
                }
        }
        ,
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '60s'}        
    );

    const refreshToken=jwt.sign(
        {"username":userExist.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}        
    );
 
    console.log(refreshToken);
    //saving refresh token with current user

userExist.refreshToken=refreshToken;
const result=await userExist.save();
console.log(result);

   //  res.cookie('jwt',refreshToken,{httpOnly:true, maxAge:24*60*60*1000});
   res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24*60*60*1000,
    //Secure:"True",
    sameSite:"None"
    
  });

     
    res.json({accessToken});
}
else{  
    res.sendStatus(401);
}

}

  module.exports=handleLogin;