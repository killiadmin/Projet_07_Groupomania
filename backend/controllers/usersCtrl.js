const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const passwordValidator = require("password-validator");
const fs = require("fs");

const schemaPassValid = new passwordValidator();
schemaPassValid.is().min(8).is().max(50).has().digits(2).has().not().spaces();

const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * Route SIGNUP : Après vérification de la saisie des caractères données : 
 * (Nombre de caractère du nom et prénom, synthaxe de l'email, saisie d'un mot de passe solide). 
 * Cette fonction va crée un nouvel utilisateur, elle va hashé le mdp avec bcrypt avant de fournir les informations à BDD,
 * ensuite qui va crée un nouveau token d'authentification et finir par envoyer les infos.
 */

function signup(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  //Controle des params du model
  if (firstname == null || lastname == null || email == null || password == null) {
    return res.status(400).json({ 
      error: "Les parametres des utilisateurs sont obsoletes!" });
  };

  //Controle de la saisie du Nom et Prenom
  if (lastname.lenght >= 20 || lastname.length <= 2 || firstname.lenght >= 20 || firstname.length <= 2) {
    return res.status(400).json({
      error: "Votre prénom et nom est compris entre 3 et 20 caracteres!",
    });
  };

  //Controle de la saisie du mail
  if (!email_regex.test(email)) {
    return res.status(400).json({ 
      error: "Votre mail n'est pas conforme!" });
  }

  //Controle password-validator
  if (!schemaPassValid.validate(password)) {
    return res.status(401).json({
      error: "Sécurité du mot de passe faible. Il doit contenir au moins 8 caractère, des majuscules et deux chiffres!",
    });
  };

  models.User.findOne({
    attribute: ["email"],
    where: { email: email },
  })

    .then(function (userFound) {
      if (!userFound) {
        bcrypt.hash(password, 5, function (err, bcryptedPassword) {
          const newUser = models.User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: bcryptedPassword,
            admin: 0,
          })
            .then(function (newUser) {
              return res.status(200).json({
                userId: newUser.id,
                admin: newUser.admin,
                token: jwt.sign({
                  userId: newUser.id,
                  admin: newUser.admin,
                },
                process.env.PASSWORD_TOKEN,
                {
                  expiresIn: "48h",
                }
                )
              });
            })
            .catch(function (err) {
              return res
                .status(500)
                .json({ error: "L'utilisateur n'a pas pu être ajouté!" });
            });
        });
      } else {
        return res.status(409).json({ error: "L'utilisateur existe déjà!" });
      }
    })
    .catch(function (err) {
      return res
        .status(500)
        .json({ error: "L'utilisateur ne peut pas être ajouté!" });
    });
}

/**
 * Route LOGIN : Cette fonction permet de nous connecter, check de l'utilisateur dans la BDD si il existe, 
 * puis bcrypt check le mdp avec méthodes compare. Après ces vérifs, un token sera assigné à l'utilisateur.  
 */

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await models.User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(401).json({ error: "Les parametres des utilisateurs sont obsoletes!" });
    } else {
      const hash = await bcrypt.compare(password, user.password);
      if (!hash) {
        return res.status(401).send({ error: "Le mot de passe est invalide!" });
      } else {
        const token = jwt.sign(
          { userId: user.id },
          process.env.PASSWORD_TOKEN,
          {
            expiresIn: "48h",
          }
        );
        res.status(200).send({
          userId: user.id,
          token: token,
          admin : user.admin
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

/**
 * Fonction qui permet d'utiliser une méthode GET pour checker tout les utilisateurs stockés dans la BDD
 */

function getUsers(req, res) {
  models.User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "Les utilisateurs sont introuvables!" });
    });
}

/**
 * Fonction qui permet d'utiliser une méthode GET pour checker un utilisateur stockés dans la BDD,
 * via son id qui lui a été assigné.
 */

function getUser(req, res) {
  const id = req.params.id;
  models.User.findByPk(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error: "L'utilisateur est introuvable!" });
    });
}

/**
 * Route PUT : Fonction qui nous permet de modifier l'avatar de l'utilisateur avec une image qu'il va fournir,
 * on utilise le package 'fs' pour supprimer l'ancienne image si cela plus d'une fois qu'il modifie l'image.
 */

async function modifyProfil(req, res) {
  try {
    const id = req.params.id;
    const user = await models.User.findOne({
      where: {
        id: id,
      },
    });
    
    let imageReq = req.file;

      if (imageReq) {
        imageReq = `${req.protocol}://${req.get("host")}/images/${ req.file.filename }`;
    } else {
      imageReq = user.imageUrl;
    }
    if (user.imageUrl != null) {
      const filename = user.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`,() => {
      models.User.update(
        {
          imageUrl: imageReq,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send({ message: "Modifications enrigistrés" });
    }) 
    } else {
      await models.User.update(
        {
          imageUrl: imageReq,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.status(200).send({ message: "Modifications enrigistrés" });
    }
} catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erreur serveur" });
  }
}

/**
 * Route DELETE : Qui va nous permettre de supprimer un utilisateur, on utilise le package 'fs' :
 * pour supprimer son avatar stocké dans la BDD. 
 * Après la suppression de l'utilisateur, tout les posts et commentaires de ce même utilisateur seront supprimés
 */

async function deleteUser(req, res, next) {
  const id = req.params.id;
  const user = await models.User.findOne({ where: { id: id } });
  try {
    const filename = user.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`,() => {
      models.User.destroy({ where: { id: id } });
      models.Post.destroy({ where: { userId: id } });
      models.Comment.destroy({ where: { userId: id } });
    return res.status(200).json({ message: "L'utilisateur à bien été supprimé" });
  })} catch(error){
     return res.status(500).send({ error: "La suppression de l'utilisateur pose problème!" });
  };
};

module.exports = { signup, login, getUser, getUsers, modifyProfil, deleteUser };
