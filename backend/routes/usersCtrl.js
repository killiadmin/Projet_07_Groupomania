const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt.utils");
const models = require("../models");
const passwordValidator = require("password-validator");

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

function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  //Controle des params du model
  if (email == null || password == null) {
    return res
      .status(400)
      .json({ error: "Les parametres des utilisateurs sont obsoletes!" });
  }

  models.User.findOne({
    where: { email: email },
  })
    .then(function (userFound) {
      if (userFound) {
        bcrypt.compare(
          password,
          userFound.password,
          function (errBycrypt, resByCrypt) {
            if (resByCrypt) {
              return res.status(200).json({
                userId: userFound.id,
                token: jwt.generateTokenForUser(userFound),
              });
            } else {
              return res
                .status(403)
                .json({ error: "Le mot de passe est invalide" });
            }
          }
        );
      } else {
        return res
          .status(404)
          .json({ error: "L'utilisateur n'existe pas dans la BDD!" });
      }
    })
    .catch(function (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Impossible de connecter l'utilisateur!" });
    });
}

module.exports = { signup, login };
