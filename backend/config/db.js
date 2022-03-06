const mysql = require("mysql");
require('dotenv').config();

const host = process.env.HOST;
const user = process.env.USER;
const psw = process.env.PASSWORD;

const db = mysql.createConnection({
  host: host,
  user: user,
  password: psw,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});