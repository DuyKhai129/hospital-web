const db = require("../models/index");
const createCRUD = require("../services/CRUDServices");
const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("------------------------");
    console.log(data);
    console.log("------------------------");

    return res.render("home.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

const getCRUD = (req, res) => {
  return res.render("create.ejs");
};
const postCRUD = async (req, res) => {
  await createCRUD.createUser(req.body);
  return res.send("---CRUD---");
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
};
