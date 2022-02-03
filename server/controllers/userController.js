const {UserModel} = require('../models/userModel');
const bcrypt = require( 'bcrypt' );

const UserController = {

    createNewUser: function ( req, res) {
        
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let password = req.body.password

        if( firstname && lastname && email && password ){
            bcrypt.hash(password,10)
            .then(encryptedpass =>{
                newUser = {
                    firstname,
                    lastname,
                    email,
                    password : encryptedpass
                }
                UserModel
                .createUser(newUser)
                .then(data =>{
                    userInfo = {
                        _id: data._id,
                        firstname : data.firstname,
                        lastname : data.lastname,
                        email : data.email
                    }
                    
                    res.status(200).json(userInfo);
                })
                .catch(err=>{
                    res.status(404).json(err).end()
                    console.log(err)
                })
            })
        }
        else{
            res.status( 406 ).end();
        }
    },

}

module.exports = { UserController };