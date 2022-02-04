const {UserModel} = require('../models/userModel');
const bcrypt = require( 'bcrypt' );

const UserController = {

    createNewUser: function ( req, res) {
        
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        var email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;
        let confpassword = req.body.confpassword;
        let admincode = req.body.admincode;
        var isValid = true;
        let errormsjs = {};
        
        function validateEmail(){
            let regx = /^([a-z0-9\._]+)@([a-z0-9])+.([a-z]+)(.[a-z]+)?$/
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
            validateEmail()
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

}

module.exports = { UserController };