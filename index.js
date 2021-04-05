'use strict'
/*Importando el modulo de Mongoose */
var mongoose = require("mongoose");
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;



/*Conección a la base de datos*/
mongoose.connect('mongodb://localhost:27017/devel_encuestas',{useNewUrlParser:true})
    .then(()=>{
        console.log("La conección de la base de datos, se ha ralizado con exito");

        app.listen(port, ()=>{
            console.log("Servidor ejecutandose en el puerto : "+ port);
        });
    });