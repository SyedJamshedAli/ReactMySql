const Employee = require("../model/Employee");
const bcrypt = require("bcrypt");

const getAllusers = async (req, res) => {
  const employees = await Employee.find();
  if (!employees) return res.status(204).json({ message: "No Employees" });
  res.json(employees);
};

//const registerNewUser

const createNewUser = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "firstname and lastname is required" });
  }

  try {
    const result = await Employee.create({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
    });

    res.status(201).json(result);
  } catch (e) {
    console.log(e);
  }

  //check duplicate data
  // const duplicate = await User.findOne({username:user}).exec();
};

const updateUser = async (req, res) => {
  if(!req?.body?.id){
    return res.status(400).json({'message':'id param is required'})
  }

  const employee=await Employee.findOne({_id:req.body.id}).exec();
  if (!employee) {
    return res
      .status(400)
      .json({ message: `employee ID ${req.body.id} not found` });
  }
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  const result=await employee.save();
  res.json(result);
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
