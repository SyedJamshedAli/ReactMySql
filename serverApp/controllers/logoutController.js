const data = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises=require('fs').promises;
const path=require('path');


const handleLogout = async (req, res) => {

    //on client also delete access token
  const cookie = req.cookies
  if (!cookie?.jwt) return res.sendStatus(204); // no content to send back

  //check refresh token in db
  const refreshToken = cookie.jwt;
  const userExist = data.users.find((u) => u.refreshToken === refreshToken);
  if (!userExist){
  
  res.clearCookie('jwt', {httpOnly:true})
     return res.sendStatus(204); //  
    }
  
//delete refresh token from db
const otherUsers=data.users.filter(p=>p.refreshToken=userExist.refreshToken);
const currentUser={...userExist,refreshToken:''};
data.setUsers([...otherUsers,currentUser]);
await fsPromises.writeFile(
    path.join(__dirname,'..','model','user.json'),
    JSON.stringify(data.users)
);
res.clearCookie('jwt',{httpOnly:true,secure:true});
res.sendStatus(204);
};

module.exports = { handleLogout } 
