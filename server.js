require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: '*', credentials: true }));

// Import de toutes les routes
require('./api/routes/router')(app, cors);

/* eslint-disable no-unused-vars */
const server = app.listen(process.env.PORT, () => console.log(`Server connected on port : ${process.env.PORT}`));
