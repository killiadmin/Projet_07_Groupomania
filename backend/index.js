const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouters').router;
const app = express();

require('dotenv').config({path: './config/.env'})
require('./config/db');

//Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//router
app.use('/api/', apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});