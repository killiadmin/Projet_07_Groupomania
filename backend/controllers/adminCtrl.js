const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");
const passwordValidator = require("password-validator");

const schemaPassValid = new passwordValidator();
schemaPassValid.is().min(8).is().max(50).has().digits(2).has().not().spaces();

const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const firstLastNameRegex = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;

function createAdmin(req, res) {
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
        error: "Votre prénom et nom doit être compris entre 3 et 20 caracteres!",
      });
    };
  
    if (!firstLastNameRegex.test(firstname, lastname)) {
      return res.status(400).json({
        error: "Votre prénom ou votre nom n'est pas conforme!",
      });
    }
  
    //Controle de la saisie du mail
    if (!email_regex.test(email)) {
      return res.status(400).json({ 
        error: "Votre  adresse mail n'est pas conforme!" });
    }
  
    //Controle password-validator
    if (!schemaPassValid.validate(password)) {
      return res.status(401).json({
        error: "Sécurité du mot de passe trop faible. Il doit contenir au moins 8 caractère et deux chiffres!",
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
              admin: 1,
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
                    expiresIn: "1h",
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
  };

module.exports = { createAdmin };