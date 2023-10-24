const User=require('../model/User');
 

const handleLogout = async (req, res) => {

    //on client also delete access token
  const cookie = req.cookies
  if (!cookie?.jwt) return res.sendStatus(204); // no content to send back

  //check refresh token in db
  const refreshToken = cookie.jwt;
//  const userExist = data.users.find((u) => u.refreshToken === refreshToken);
  const userExist = await User.findOne({refreshToken}).exec(); //data.users.find(u => u.refreshToken === refreshToken   );

  if (!userExist){
  
  res.clearCookie('jwt', {httpOnly:true})
     return res.sendStatus(204); //  
    }
  
//delete refresh token from db
userExist.refreshToken="";
const result=await userExist.save();
console.log(result);

res.clearCookie('jwt',{httpOnly:true,secure:true});
res.sendStatus(204);
};

module.exports = { handleLogout } 
