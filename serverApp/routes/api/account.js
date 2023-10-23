
const express =require('express');
const router=express.Router();
const path=require('path');
const data={};
data.user=require('../../model/user.json');
const employeeController=require('../../controllers/employeesController')
const rolesList=require('../../config/roles_list');
const verifyRoles=require('../../middleware/verifyRoles');

router.route('/')
.get(
    employeeController.getAllusers    
)
.post(
    verifyRoles(rolesList.Admin,rolesList.Editor),employeeController.createNewUser
)
.put(
    verifyRoles(rolesList.Admin,rolesList.Editor),employeeController.updateUser
)
.delete(
    verifyRoles(rolesList.Admin),
    employeeController.deleteUser
)

router.route('/:id')
.get(
    employeeController.getUser
)


module.exports = router;