const models = require("../models");
const fs = require("fs");

/**
 * Fonction GET qui permet de lire tout les posts stockés dans la BDD 
 * et de checker quel utilisateur est assigné à tel post
 */

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
    console.error(err);
    return res.status(500).send({
      error: "Les posts ne peuvent pas être afficher!",
    });
  }
}

/**
 * Fonction GET qui permet de lire un post en particulier stocké dans la BDD 
 * et de checker quel utilisateur est assigné à ce post
*/

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
    console.error(error);
    return res.status(500).send({
      error: "Votre post ne peut pas être afficher!",
    });
  };
};

/**
 * Fonction POST qui nous permet de crée un nouveau post, si une image est fournit elle va crée un lien vers cette image stockés
 * dans le dossier 'images' sinon l'image sera égale à null. Ensuite l'id de l'utilisateur sera assigné à ce post,
 * et le body du post représente le corp du message donnée par l'utilisateur.
*/

async function createNewPost(req, res) {
  try {
    
    if (req.file) {
      req.file = `${req.protocol}://${req.get("host")}/images/private/${
        req.file.filename
      }`;
    } else {
      req.file = null;
    };
    
    const { body } = req.body;
    const { userId } = res.locals.decodedToken;
    console.log(body, userId);

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
  };
};

/**
 *(À confirmer avec Groupomania), Fonction PUT qui n'est pas exploiter dans le front, qui permet de modifier le contenu d'un post donc son body déjà existant 
 * et son image.  
 */

async function modifyPostProfil(req, res) {
  try {
    const { userId } = res.locals.decodedToken;
    const { id } = req.params;
    const { body } = req.body;
    const { admin } = res.locals.decodedToken;
    const post = await models.Post.findOne({
      where: {
        id: id,
      },
    });
    if (req.file) {
      req.file = `${req.protocol}://${req.get("host")}/images/private/${
        req.file.filename
      }`;
    } else {
      req.file = null;
    };
    if (userId === post.userId || admin === true) {
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
  };
};

/**
 * Fonction DELETE qui permet de supprimer le body d'un post. Si il y a une image dans ce post, elle sera supprimer du dossier 'images'.
 * Un utilisateur pourra supprimer son post ainsi qu'un admin ayant le status.
*/

async function deletePost(req, res) {
  const { userId } = res.locals.decodedToken;
  const { admin } = res.locals.decodedToken;
  const { id } = req.params;
  
  const post = await models.Post.findOne({
    where: {
      id: id,
    },
  });

  if (userId === post.userId || admin === true) {
    if (post.imageUrl) {
      const filename = post.imageUrl.split("/images/private")[1];
      fs.unlink(`images/private/${filename}`, () => {
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
  };
};

module.exports = {
  readPosts,
  readPost,
  createNewPost,
  modifyPostProfil,
  deletePost,
};
