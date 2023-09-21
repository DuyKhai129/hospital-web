const bcrypt = require("bcrypt");
const saltRounds = 10;
// const myPlaintextPassword = "s0//P4$$w0rD";
// const someOtherPlaintextPassword = "not_bacon";
const db = require("../models/index");

const createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPass = await hashPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPass,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        image: data.image,
        role: data.role,
      });
      resolve("Success!");
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

module.exports = {
  createUser,
};
