const allowedOrigins=require('../config/allowedOrigins');

const credentials=(req,res,next)=>{
const origin=req.header.origin;
if(allowedOrigins.includes(origin))
{
    res.header('Access-control-allow-Credentials',true);

}
next();
}


module.exports=credentials;