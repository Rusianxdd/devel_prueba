'use strict'

var validator = require('validator');
const { param } = require('../app');
var User = require('../model/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var controller = {
    saveUser:(req,res)=>{
        var params =req.body;

        
        //validar datos (validator)
        try{
            var validate_user = !validator.isEmpty(params.username);
            var validator_password = !validator.isEmpty(params.password);

        }catch(err){
                return res.status(200).send({
                status: 'error',     
                message:'faltan datos por enviar!!!!'
            });
        }

        if(validate_user && validator_password){ 
          
            bcrypt.hash(params.password,10 ,function(err,hashedPass){//Encriptando el Password
                if(err){
                    res.json({
                        erro:err
                    });
                }
                var user = new User(); 
     
                //asignar valores al objeto | Guardar los parametros en el Model
                user.username = params.username;
                user.password= hashedPass; 
               
    
              
                user.save((err,userStored)=>{
                    if(err || !userStored){ //sino se ha guardado
                        return res.status(404).send({
                            status: 'error',
                            message:'El usuario no se ha guardado'
                        });
                    }
              
                    res.redirect('/');
                });
            });//Fin del bcrypt
            

        }else{
            return res.status(200).send({
                status: 'error',
                message:'Los datos no son validos.'
            });
        }
    },
    autenticar:(req, res)=>{
       
        var username = req.body.username;
        var password =req.body.password;
        
        User.findOne({$or:[{username:username}]})
        .then(user =>{
            if(user){
                bcrypt.compare(password, user.password, function(err,result){
                    if(err){
                        res.json({
                            error: err
                        });
                    }
                    if(result){
                        var token =jwt.sign({username:user.username}, 'verySecretValue',{expiresIn:'1h'});
                        res.redirect('/encuestas.html');
                    }else{
                        res.json({
                            message:'password no correcta'
                        });
                    }
                });
            }else{
                res.json({
                    message:'No se encontro el usuario'
                });
            }
        });

        
    }
}

module.exports = controller;