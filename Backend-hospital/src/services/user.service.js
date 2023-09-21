const db = require("../models/index");
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10);

const handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userDB = {};
      const isExist = await checkEmail(email);
      if (isExist) {
        const user = await db.User.findOne({
          attributes: ["email", "role", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          //compare password
          const checkPass = await bcrypt.compareSync(password, user.password);
          if (checkPass) {
            userDB.errCode = 0;
            userDB.errMessage = "Success";

            // delete pass show
            delete user.password;
            userDB.user = user;
          } else {
            userDB.errCode = 3;
            userDB.errMessage = "Wrong password";
          }
        } else {
          userDB.errCode = 2;
          userDB.errMessage = `User's not found!`;
        }
        // resolve();
      } else {
        userDB.errCode = 1;
        userDB.errMessage = `Your's email isn't exist in your system. Please try other email!`;
      }
      resolve(userDB);
    } catch (error) {
      reject(error);
    }
  });
};

const checkEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { email: email },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = {};
      if (userId === "ALL") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
const hashPassword = (pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hashSync(pass, saltRounds);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};
const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your email already exists in the system. Please use a different email!",
        });
      }
      let hashPass = await hashPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPass,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        role: data.role,
      });
      resolve({
        errCode: 0,
        errMessage: "Success!",
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id }, // id:id
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "The user isn't exist!",
        });
      }
      await db.User.destroy({
        where: { id },
      });
      resolve({
        errCode: 0,
        errMessage: "The user is deleted!",
      });
    } catch (error) {
      reject(error);
    }
  });
};
const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter",
        });
      }
      const user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          (user.phoneNumber = data.phoneNumber),
          (user.gender = data.gender),
          (user.role = data.role),
          (user.image = data.image),
          (user.position = data.position),
          await user.save();
        resolve({
          errCode: 0,
          errMessage: "Success! Update user!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User's not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
};
