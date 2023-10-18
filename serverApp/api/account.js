const express =require('express');
const router=express.Router();
const path=require('path');
const data={};
data.user=require('../data/user.json')

router.route('/')
.get((req,res)=>{
response.json(data.user)
})



module.exports=router;