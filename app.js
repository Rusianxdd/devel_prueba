'use strict'
/*--------------Importación de Modulos---------------*/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var bcrypt = require ('bcrypt');



var app = express();

var routes = require('./routes/routes');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,'public')));


app.use(routes);


/*Exportar modulo */
module.exports = app;

