const jwt=require('jsonwebtoken');
//require('dotenv').config();

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.authorization;
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
    //console.log(authHeader);
const token=authHeader.split(' ')[1];
console.log(token);
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    console.log(err)
    console.log(decoded)
    if(err) res.sendStatus(403);
    req.username=decoded.userInfo.username;
    req.roles=decoded.userInfo.roles
    next();
})


}
module.exports=verifyJWT