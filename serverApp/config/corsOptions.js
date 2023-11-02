
const allowedOrigins=require('../config/allowedOrigins');

const corsOptions={
    origin:(origin,callback)=>{
        console.log(origin);
        if(allowedOrigins.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }else
        {
            callback(new Error('not Allowed by cors'))
        }
    },
    optionsSuccessStatus:200
}
module.exports=corsOptions;