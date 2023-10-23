const express=require('express');
const router=express.Router();
const handleLogin=require('../controllers/authController')

//router.post('/',registerController.createNewUser);

router.route('/')
.post(
        handleLogin 
)


module.exports=router;
