const express = require('express');
const app = express();
const { authRouter } = require('./router/auth.router');
const bodyParser = require('body-parser');
const { productsRouter } = require("./router/home.router");
const path = require("path");

require('./config/db');
require('dotenv').config({path: './config/.env'});

//Cors
const cors = require('cors');
app.use(cors());

//Helmet
const helmet =require("helmet");
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

//Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Router
app.use('/api/', authRouter);
app.use('/api/', productsRouter);

//Path
app.use("/images", express.static(path.join(__dirname, "images")));

//Listen_PORT
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});