const express=require('express');
const router=express.Router();
const registerController=require('../controllers/employeesController')

//router.post('/',registerController.createNewUser);

router.route('/')
.post(
   console.log('in register.js')
)

module.exports=router;
