
const express =require('express');
const router=express.Router();
const path=require('path');
const data={};
data.user=require('../../model/user.json');
const employeeContoller=require('../../controllers/employeesController')

router.route('/')
.get(
employeeContoller.getAllusers    
)
.post(
employeeContoller.createNewUser
)
.put(
employeeContoller.updateUser
)
.delete(
employeeContoller.deleteUser
)

router.route('/:id')
.get(
    employeeContoller.getUser
)


module.exports = router;