const express = require("express");
const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./route/web");
const connectDB = require("./config/connectDB");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const hostName = process.env.HOST_NAME;

//cross-origin
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

viewEngine(app);
initWebRoutes(app);

connectDB();

app.listen(port, hostName, () => {
  console.log(`Example app listening to ${hostName}:${port}`);
});