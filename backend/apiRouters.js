const express = require("express");
const usersCtrl = require("./routes/usersCtrl");

//Router
exports.router = (function () {
  const apiRouter = express.Router();

  //Users routes
  apiRouter.route("/users/signup/").post(usersCtrl.signup);
  apiRouter.route("/users/login/").post(usersCtrl.login);

  return apiRouter;
})();
