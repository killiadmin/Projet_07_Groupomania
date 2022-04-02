const express = require("express");
const { signup, login } = require("../controllers/usersCtrl");
const { createAdmin } = require("../controllers/adminCtrl");

//Router
const authRouter = express.Router();

//Users routes
authRouter.post("/users/signup/", signup);
authRouter.post("/users/createAdmin/", createAdmin);
authRouter.post("/users/login/", login);

module.exports = { authRouter };
