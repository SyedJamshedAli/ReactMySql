const express=require('express');
const router=express.Router();
const logoutController=require('../controllers/logoutController')

router.get('/',logoutController.handleLogout
);

/*router.route('/')
.get(
    refreshTokenController.handleRefreshToken
)*/


module.exports=router;
 