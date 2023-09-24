const userService = require("../services/user.service");
const handleLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    if (!email || !password) {
      res.status(500).json({
        errCode: 1,
        message: "Missing inputs parameter",
      });
    }
    const userDB = await userService.handleUserLogin(email, password);
    return res.status(200).json({
      message: userDB.errMessage,
      errCode: userDB.errCode,
      user: userDB.user ? userDB.user : {},
    });
  } catch (error) {
    console.log(error);
  }
};
const handleGetAllUsers = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 0,
      errMessage: "Missing required parameter",
      users: {},
    });
  }
  const users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

const handleCreateUser = async (req, res) => {
  const message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
const handleEditUser = async (req, res) => {
  const message = await userService.updateUser(req.body);
  return res.status(200).json(message);
};
const handleDeleteUser = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(201).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  const message = await userService.deleteUser(id);
  return res.status(200).json(message);
};
module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateUser,
  handleEditUser,
  handleDeleteUser,
};
