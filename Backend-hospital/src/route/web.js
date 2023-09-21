const express = require("express");
const route = express.Router();
const user = require("../controllers/user.controller");
//const homeController = require("../controllers/homeController");
const initWebRoutes = (app) => {
  // route.get("/hello", homeController.getHomePage);
  //route.get("/get_crud", homeController.getCRUD);
  //route.post("/post-crud", homeController.postCRUD);

  route.post("/login", user.handleLogin);
  route.get("/get-all-users", user.handleGetAllUsers);
  route.post("/create-user", user.handleCreateUser);
  route.patch("/edit-user", user.handleEditUser);
  route.delete("/delete-user", user.handleDeleteUser);

  return app.use("/api/v1", route);
};
module.exports = initWebRoutes;
