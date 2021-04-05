'use strict'
/*Creando Modelo de Usuario */

/*Importar Modulos de mongoose y bcrypt */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var saltRounds = 10;


var UserSchema = Schema({
    username: String,
    password:String
});



module.exports = mongoose.model('User',UserSchema);