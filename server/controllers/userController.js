const {UserModel} = require('../models/userModel');
const bcrypt = require( 'bcrypt' );
const flash = require('express-flash');
const { use } = require('bcrypt/promises');

const UserController = {

    loadLogin : function( req, res){
        res.render( 'login' );
    },

    createNewUser: function ( req, res) {
        
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let confpassword = req.body.confpassword;
        let admincode = req.body.admincode;
        var isValid = true;
        let errormsjs = {};
        
        function validateEmail(){
            let email = req.body.email;
            let regx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            // /^([a-z0-9\._]+)@([a-z0-9]+).([a-z]+)(.[a-z]+)?$/
            if(regx.email){
                //alert("You provide a valid Email")
                console.log("You provide a valid Email");
                return isValid = true;
            }
            else{
                console.log("You provide an invalid Email");
                return isValid = false;
            }
        }

        console.log( "_________Start Data_________");
        console.log( "New user data: (firstname)", firstname );
        console.log( "New user data: (lastname)", lastname );
        console.log( "New user data: (email)", email );
        console.log( "New user data: (username)", username );
        console.log( "New user data: (admincode)", admincode );
        console.log( "_________Data Complete_________");

        if( firstname && lastname && email && password && username){
            
            if(firstname.length < 3){
                errormsjs.firstnamelen = "Firstname field must be at least 3 characters long"
                console.log("Firstname field must be at least 3 characters long");
                isValid = false;
            }
            if(lastname.length < 5){
                errormsjs.lastnamelen = "Lastname field must be at least 5 characters long"
                console.log("Lastname field must be at least 5 characters long");
                isValid = false;
            }
            if(email.length < 5){
                errormsjs.lastnamelen = "email field must have valid characters"
                console.log("email field must have valid characters");
                isValid = false;
            }
            //validateEmail()
            if(username.length < 5){
                errormsjs.usernamelen = "Username field must be at least 5 characters long"
                console.log("Username field must be at least 5 characters long");
                isValid = false;
            }
            if(password.length < 8){
                errormsjs.passlen = "Password field must be at least 8 characters long"
                console.log("Password field must be at least 5 characters long");
                isValid = false;
            }
            if(password !== confpassword){
                errormsjs.passnotmatch = "Confirm password and password doesn't match, please be sure you type the right password"
                console.log("Confirm password and password doesn't match, please be sure you type the right password");
                isValid = false;
            }

            if(isValid){
                console.log("All the data sended was correct");
                bcrypt.hash(password,10)
                .then(encryptedpass =>{
                    newUser = {
                        firstname,
                        lastname,
                        email,
                        username,
                        password : encryptedpass
                    }
                    UserModel
                    .createUser(newUser)
                    .then(data =>{
                        userInfo = {
                            _id: data._id,
                            firstname : data.firstname,
                            lastname : data.lastname,
                            email : data.email,
                            username : data.username
                        }
                        res.status(200).json("Data from UserController.createNewUser: ", userInfo);
                    })
                    .catch(err=>{
                        res.status(404).json(err).end()
                        console.log(err)
                    })
                })
            }
        }
        else{
            console.log("You must to provide all the data required");
            res.status( 406 ).end();
        }
    },

    login: function (req,res) {
        let username = req.body.username
        let password = req.body.password

        if(username && password){
            UserModel
                .getUserByUsername(username)
                .then(data =>{
                    if(!data){
                        throw new Error( "That user doesn't exist!" );
                    }
                    bcrypt.compare( password, data.password )
                    .then(flag =>{
                        if( !flag ){
                            let errormsj = {
                                passworderror: "Wrong password!"
                            }
                            res.status(400).json(errormsj);
                            throw new Error( "Wrong password!" )
                        }
                        userInfo = {
                            _id: data._id,
                            firstname : data.firstname,
                            lastname : data.lastname,
                            email : data.email,
                            username: data.username
                        }
                        req.session.firstname = data.firstname,
                        req.session.lastname = data.lastname,
                        req.session.email = data.email,
                        req.session.username = data.username,

                        res.status(200).json(userInfo);
                    })
                    .catch( error => {
                        res.statusMessage = error.message;
                        res.status(406).end()
                        req.redirect( '/' );
                    }); 
                })
                .catch( error => {
                    res.statusMessage = error.message;
                    res.status( 404 ).end();
                    console.log(error);
                });
        }
        else{
            let errormsj = {
                emptyerror: "You've to provide the required information"
            }
            res.status(400).json(errormsj)
        }

    },

}

module.exports = { UserController };