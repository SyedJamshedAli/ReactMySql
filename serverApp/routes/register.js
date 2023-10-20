const express=require('express');
const router=express.Router();
const registerController=require('../controllers/employeesController')

//router.post('/',registerController.createNewUser);

router.route('/')
.get(
    registerController.getAllusers 
)
.post(
    registerController.createNewUser
)

module.exports=router;
