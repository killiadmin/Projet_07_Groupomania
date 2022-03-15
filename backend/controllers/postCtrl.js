const models = require("../models");
const fs = require("fs");

//Route GET All

async function readPosts(req, res) {
  try {
    const posts = await models.Post.findAll({
      order: [["updatedAt", "DESC"]],
      include: [
        
        {
          model: await models.User,
          attributes: ["firstname", "lastname", "id", "imageUrl"],
        },
      ],
    });
    return res.status(200).send(posts);
  } catch (err) {
    return res.status(500).send({
      error: "Les posts ne peuvent pas être afficher!",
    });
  }
}

//Route GET One

async function readPost(req, res) {
  try {
    const { id } = req.params;
    const post = await models.Post.findOne({
      where: {
        id: id,
      },
      include: [
        
        {
          model: await models.User,
          attributes: ["firstname", "lastname", "id", "imageUrl"],
        },
      ],
    });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({
      error: "Votre post ne peut pas être afficher!",
    });
  }
}

// Route POST

async function createNewPost(req, res) {
  try {
    
    if (req.file) {
      req.file = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    } else {
      req.file = null;
    }
    
    const { body } = req.body;
    const { userId } = res.locals.decodedToken;

    await models.User.findOne({
      where: { id: userId },
    });

    models.Post.create({
      UserId: userId,
      body: body,
      imageUrl: req.file,
    });

    return res.status(201).json({ message: "Votre post à bien été envoyé!" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Votre post n'a pas été envoyé!" });
  }
}

//Route PUT

async function modifyPostProfil(req, res) {
  try {
    const userId = res.locals.decodedToken.userId;
    const { id } = req.params;
    const { body } = req.body;
    const post = await models.Post.findOne({
      where: {
        id: id,
      },
    });
    if (req.file) {
      req.file = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    } else {
      req.file = null;
    }
    if (userId === post.userId) {
      await models.Post.update(
        {
          body: body ? body : post.message,
          imageUrl: req.file,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res
        .status(200)
        .send({ message: "Les modification demandés ont été importés!" });
    } else {
      return res
        .status(400)
        .json({ message: "Impossible de modifier votre publication!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erreur serveur" });
  }
}

//Route DELETE

async function deletePost(req, res) {
  const { userId } = await res.locals.decodedToken;
  const { id } = req.params;
  
  const post = await models.Post.findOne({
    where: {
      id: id,
    },
  });

  if (userId === post.userId) {
    if (post.imageUrl) {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        models.Comment.destroy({
          where: {
            postId: id,
          },
        }),
          models.Post.destroy({
            where: {
              id: id,
            },
          });
      });
      return res.status(200).json({ message: "Post supprimé !" });
    } else {
      models.Comment.destroy({
        where: {
          postId: id,
        },
      }),
        models.Post.destroy({
          where: {
            id: id,
          },
        });
      return res.status(200).json({ message: "Post supprimé !" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Vous ne pouvez pas supprimer ce post" });
  }
}

module.exports = {
  readPosts,
  readPost,
  createNewPost,
  modifyPostProfil,
  deletePost,
};
