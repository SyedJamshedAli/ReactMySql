const allowedOrigins=require('../config/allowedOrigins');

const credentials=(req,res,next)=>{
const origin=req.headers.referer;//req.header.origin;
console.log(`credentials.js origin:${origin}`)
if(allowedOrigins.includes(origin))
{
    res.header('Access-control-allow-Credentials',true);

}
next();
}


module.exports=credentials;