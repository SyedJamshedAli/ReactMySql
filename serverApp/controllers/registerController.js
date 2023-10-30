const User=require('../model/User')
const bcrypt = require("bcrypt");

const getAllusers = (req, res) => {
  res.json(data.users);
};

//const registerNewUser

const createNewUser = async (req, res) => {

    
  const { name, email, password } = req.body;
  if ((!email, !password))
    return res
      .status(400)
      .json({ message: "Name,email and password is required" });
console.log(req.body)
  
  //check duplicate data
   const duplicate = await User.findOne({username:email}).exec();
   
    if ((duplicate)) 
  {return res.sendStatus(409); //conflice
}
  try {

    //encrypt password
    console.log(password.toString());
    const hashPassword = await bcrypt.hash(password.toString(), 10);
    console.log(hashPassword);
    //create and store new user
    const result = await User.create({
      
      "username": email.toString(),
      "password": hashPassword
      
    });

  console.log(result);
     
    
    return res.status(201).json({ success: `User created ${email} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  //data.setUsers(newUser);
};

const updateUser = (req, res) => {
  const user = data.users.find((user) => user.id === parseInt(req.body.id));
  if (!user) {
    return res
      .status(400)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.password) user.password = req.body.password;
  const filteredUserData = data.users.filter(
    (user) => user.id !== parseInt(req.body.id)
  );
  const newUserArray = [...filteredUserData, user];

  data.setUsers(
    newUserArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.users);

  /* res.json({
        "Put":req.body.firstname,
        "Put_":req.body.lastname
    })*/
};

const deleteUser = (req, res) => {
  res.json({
    delete: req.body.firstname,
    delete_: req.body.lastname,
  });
};

const getUser = (req, res) => {
  res.json({
    urlParam: req.params.id,
  });
};

module.exports = {
  getAllusers,
  createNewUser,
  updateUser,
  deleteUser,
  getUser,
};
