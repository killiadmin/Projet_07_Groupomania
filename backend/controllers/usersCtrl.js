const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const passwordValidator = require("password-validator");
const fs = require("fs");

const schemaPassValid = new passwordValidator();
schemaPassValid.is().min(8).is().max(50).has().digits(2).has().not().spaces();

const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//Routes SIGNUP

function signup(req, res) {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  //Controle des params du model
  if (
    firstname == null ||
    lastname == null ||
    email == null ||
    password == null
  ) {
    return res
      .status(400)
      .json({ error: "Les parametres des utilisateurs sont obsoletes!" });
  }

  //Controle de la saisie du Nom et Prenom
  if (
    lastname.lenght >= 20 ||
    lastname.length <= 4 ||
    firstname.lenght >= 20 ||
    firstname.length <= 4
  ) {
    return res.status(400).json({
      error: "Votre prénom et nom est compris entre 3 et 20 caracteres!",
    });
  }

  //Controle de la saisie du mail
  if (!email_regex.test(email)) {
    return res.status(400).json({ error: "Votre mail n'est pas conforme!" });
  }

  //Controle password-validator
  if (!schemaPassValid.validate(password)) {
    return res.status(401).json({
      error:
        "Sécurité du mot de passe faible. Il doit contenir au moins 8 caractère, des majuscules et deux chiffres!",
    });
  }

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
            isAdmin: 0,
          })
            .then(function (newUser) {
              return res.status(200).json({
                userId: newUser.id,
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

// route LOGIN

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await models.User.findOne({
      where: { email: email },
    });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Les parametres des utilisateurs sont obsoletes!" });
    } else {
      const hash = await bcrypt.compare(password, user.password);
      if (!hash) {
        return res.status(401).send({ error: "Le mot de passe est invalide!" });
      } else {
        const userToken = jwt.sign(
          { userId: user.id },
          process.env.PASSWORD_TOKEN,
          {
            expiresIn: "48h",
          }
        );
        res.status(200).send({
          id: user.id,
          userToken,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

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

//PUT

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
      imageReq = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    } else {
      imageReq = user.imageUrl;
    }
    await models.User.update(
      {
        imageUrl: imageReq,
        firstname: req.body.firstname ? req.body.firstname : user.firstname,
        lastname: req.body.lastname ? req.body.lastname : user.lastname,
        email: req.body.email ? req.body.email : user.email,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.status(200).send({ message: "Modifications enrigistrés" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Erreur serveur" });
  }
}

//DELETE

async function deleteUser(req, res) {
  const id = req.params.id;
  const user = await models.User.findOne({
    where: {
      id: id,
    },
  });
  try {
    const filename = user.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      models.User.destroy({
        where: {
          id: id,
        },
      });
    });
    return res.status(200).json({ message: "Le compte a bien été supprimé" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ err: "Il y a eu une erreur lors de la suppression du compte!" });
  }
}

module.exports = { signup, login, getUser, getUsers, modifyProfil, deleteUser };
