'use strict'

var express = require('express');
var userControll = require('../controllers/userControll');

var router = express.Router();


//Rutas al controlador userControll
router.post('/register', userControll.saveUser);
router.post('/autenticar', userControll.autenticar);




module.exports = router;