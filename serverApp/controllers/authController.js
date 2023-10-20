const data = {
    users: require("../model/user.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };
  
  const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
require('dotenv').config();
const fsPromise=require('fs').promises;
const path=require('path');

  const handleLogin= async (req,res)=>{
    console.log(req.body);
const {email,pwd}=req.body;
console.log(`${email} - ${pwd}`);
if (!email || !pwd) return res.status(400).json({"message":"user and pwd is required"})
  
const userExist=data.users.find(u=>(u.email===email));
if (!userExist) return res.sendStatus(401);// unauthorized


//check password
const match= await bcrypt.compare(pwd,userExist.password);
if (match){
    //create JWTs
    const accessToken=jwt.sign(
        {"username":userExist.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '60s'}        
    );

    const refreshToken=jwt.sign(
        {"username":userExist.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}        
    );
    const otherUsers=data.users.filter(u=>u.email!== userExist.email);
    //const currentUsers=    
    
    res.json({"message":`${email} is logged in `})
}
else{
    res.sendStatus(401);
}

}

  module.exports=handleLogin;