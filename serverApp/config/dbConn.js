const mongoose=require('mongoose');
//DATABASE_URI=mongodb+srv://api:Ge7tIj8sSL01W9ck@cluster0.udy8k3w.mongodb.net/Api?retryWrites=true&w=majority

const connectDB= async ()=>{
try{
await mongoose.connect(process.env.DATABASE_URI,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
}
catch(err){
    console.log(err);

}

}
module.exports=connectDB;