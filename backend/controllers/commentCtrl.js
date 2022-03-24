const models = require("../models");

//Route GET

async function readComments(req, res) {
  try {
    const comments = await models.Comment.findAll({
      order: [["createdAt", "DESC"]],
      
      include: [
        {
          model: await models.User,
          attributes: ["firstname", "lastname", "id", "imageUrl"],
        },
      ],
    });
    console.log(comments)
    return res.status(200).json({ comments });
  } catch {
    console.error(error);
    return res
      .status(400)
      .json({ error: "Il y a eu une erreur pour afficher les commentaires!" });
  }
}

//Route POST
async function createComment(req, res) {
  try {
    const { id } = req.params;
    const { body } = req.body;
    const { userId } = res.locals.decodedToken;

    await models.User.findOne({
      where: { id: userId },
    });
    
    models.Comment.create({
      UserId: userId,
      PostId: id,
      body: body,
    });
    return res.status(201).json({ message: "Votre commentaire a été envoyé!" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: "Votre commentaire n'a pas été crée!" });
  }
}

//Route DELETE

async function deleteComment(req, res) {
  const { userId } = await res.locals.decodedToken;
  const { id } = req.params;
  
  const comment = await models.Comment.findOne({
    where: {
      id: id,
    },
  });

  if (userId === comment.userId || userId === 1) { 
    models.Comment.destroy({
      where: {
        id: id,
      },
    });
    return res
      .status(200)
      .json({ message: "Votre commentaire a été supprimé!" });
  } else {
    return res
      .status(400)
      .json({ message: "Votre commentaire n'a pas été supprimé!" });
  }
}

module.exports = { readComments, createComment, deleteComment };
