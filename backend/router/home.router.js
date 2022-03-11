const express = require('express');
const productsRouter = express.Router();
const { AuthUser } = require('../middleware/autUser');
const bodyParser = require("body-parser");
const { getUser, getUsers, modifyProfil, deleteUser } = require("../routes/usersCtrl");
const { uploadImage } = require("../middleware/multer");

productsRouter.use(bodyParser.json());
productsRouter.use(bodyParser.urlencoded({ extended: true }));

productsRouter.use(AuthUser)

productsRouter.get("/users/", getUsers);
productsRouter.get("/users/:id" , getUser);
productsRouter.put("/users/:id",uploadImage.single("image"), modifyProfil);
productsRouter.delete("/users/:id", deleteUser);

module.exports = { productsRouter };