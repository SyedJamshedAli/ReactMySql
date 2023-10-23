const data = {
    users: require("../model/user.json"),
    setUsers: function (data) {
      this.users = data;
    },
  };
  
  const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
//require('dotenv').config();
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
    const otherUsers=data.users.filter(u=>u.email!== userExist.email);
    const currentUsers=   {...userExist,refreshToken};
    
    data.setUsers([...otherUsers,currentUsers]);
await fsPromise.writeFile(
  path.join(__dirname,'..','model','user.json'),
  JSON.stringify(data.users)
);

   //  res.cookie('jwt',refreshToken,{httpOnly:true, maxAge:24*60*60*1000});
   res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24*60*60*1000,
    sameSite:"None",
    Secure:"True"
  });

     
    res.json({accessToken});
}
else{  
    res.sendStatus(401);
}

}

  module.exports=handleLogin;