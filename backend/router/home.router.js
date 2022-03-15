const express = require('express');
const productsRouter = express.Router();
const { AuthUser } = require('../middleware/autUser');
const { getUser, getUsers, modifyProfil, deleteUser } = require("../controllers/usersCtrl");
const { readPosts, readPost, createNewPost, modifyPostProfil, deletePost } = require("../controllers/postCtrl");
const { readComments, createComment, deleteComment } = require("../controllers/commentCtrl");
const { uploadImage } = require("../middleware/multer");


// productsRouter.use(AuthUser)

//Route Users
productsRouter.get("/users/", AuthUser, getUsers);
productsRouter.get("/users/:id" ,AuthUser, getUser);
productsRouter.put("/users/:id",AuthUser, uploadImage.single("image"), modifyProfil);
productsRouter.delete("/users/:id",AuthUser, deleteUser);

//Route Post
productsRouter.get('/', AuthUser, readPosts);
productsRouter.get('/:id', AuthUser, readPost);
productsRouter.post('/',AuthUser, createNewPost);
productsRouter.put('/:id',AuthUser, modifyPostProfil);
productsRouter.delete('/:id',AuthUser, deletePost);

//Route Comment
productsRouter.get('/comments',AuthUser, readComments); 
productsRouter.post('/comments/:id',AuthUser, createComment);
productsRouter.delete('/comments/:id',AuthUser, deleteComment);
module.exports = { productsRouter };