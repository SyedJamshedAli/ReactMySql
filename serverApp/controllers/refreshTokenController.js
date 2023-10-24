const User=require('../model/User');
 
const jwt = require("jsonwebtoken");

//require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies
  console.log(cookie)
  if (!cookie?.jwt) return res.sendStatus(401);
  //console(cookie.jwt);
  const refreshToken = cookie.jwt;
  const userExist = await User.findOne({refreshToken}).exec(); //data.users.find(u => u.refreshToken === refreshToken   );
    console.log(`User Exist: ${userExist}`);
  if (!userExist) return res.sendStatus(403); // forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || userExist.email !== decoded.username) return res.sendStatus(403);
const roles=Object.values(userExist.roles);
    const accessToken = jwt.sign(
      {
        "userInfo":{
        "username": decoded.username,
        "roles":roles 
        }
        },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken } 
