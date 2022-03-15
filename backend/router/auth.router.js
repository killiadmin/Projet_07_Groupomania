const express = require("express");
const { signup, login } = require("../controllers/usersCtrl");

//Router

const authRouter = express.Router();

//Users routes
authRouter.post("/users/signup/", signup);
authRouter.post("/users/login/", login);

module.exports = { authRouter };
