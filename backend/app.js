const express = require('express');
const bodyParser = require("body-parser");

const app = express();

//analyse les requêtes de type de contenu - application/json
app.use(bodyParser.json());

//analyse les requêtes de type de contenu - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// simple route
app.use("/", (req, res, next) => {
    res.json({ message: "Bienvenue !!!" });
});

module.exports = app;
