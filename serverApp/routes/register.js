const express=require('express');
const router=express.Router();
const registerController=require('../controllers/registerController')
const rolesList=require('../config/roles_list');
const verifyRoles=require('../middleware/verifyRoles');
//router.post('/',registerController.createNewUser);

router.route('/')
.get(
    registerController.getAllusers 
)
.post(
    registerController.createNewUser
)

module.exports=router;
