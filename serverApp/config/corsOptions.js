const whitelist=['http://localhost:3000'];
const corsOptions={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }else
        {
            callback(new Error('not Allowed by cors'))
        }
    },
    optionsSuccessStatus:200
}
module.exports=corsOptions;