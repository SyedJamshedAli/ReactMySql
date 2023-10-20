const data = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const getAllusers = (req, res) => {
  res.json(data.users);
};

//const registerNewUser

const createNewUser = async (req, res) => {
console.log(req.body);
    const newUser = {
    id: data.users[data.users.length - 1].id + 1 || 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const { name, email, password } = req.body;
  if ((!name, !email, !password))
    return res
      .status(400)
      .json({ message: "Name,email and password is required" });

  if (!newUser.name || !newUser.email || !newUser.password)
    return res
      .status(400)
      .json({ message: "Name,email and password is required" });

  //check duplicate data
  const duplicate = data.users.find((u) => u.email === email);
  if (!duplicate) return res.sendStatus(409); //conflice
  try {
    //encrypt password
    const hashedpwd = await bcrypt.hash(pwd, 10);
    //store new user
    data.setUsers([...data.users, newUser]);

    await fsPromise.writeFile(
      path.join(__dirname, "..", "model", "user.json"),
      JSON.stringify(data.users)
    );
    console.log(data.users);
    return res.status(201).json({ success: `User created ${user} created` });
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
