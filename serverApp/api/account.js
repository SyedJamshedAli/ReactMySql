
const express =require('express');
const router=express.Router();
const path=require('path');
const data={};
data.user=require('../data/user.json');


router.route('/')
.get((req,res)=>{
res.json(data.user)
})
.post((req,res)=>{
    res.json({
        "first_Name":req.body.firstname,
        "last_name":req.body.lastname
    })
})
.put((req,res)=>{
    res.json({
        "Put":req.body.firstname,
        "Put_":req.body.lastname
    })
})
.delete((req,res)=>{
    res.json({
        "delete":req.body.firstname,
        "delete_":req.body.lastname
    })
})

router.route('/:id')
.get((req,res)=>{
    res.json({
        "urlParam":req.params.id        
    })
})


module.exports = router;