//* REQUIRES
const mongoose = require('mongoose');

//*----------------CONSTRUCTOR-------------------------------------------------------------------------------------
const UserSchema = new mongoose.Schema({

    firstname :{
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },

    lastname : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    username : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        minlength : 3,
        required : true
    },

    admintype : {
        type : String,
        required : true
    },

    recoverToken : {
        type : String,
        default: null
    },

    profilepic :{
        type : String,
        default : null
    }


});
//*----------------CONSTRUCTOR END----------------------------------------------------------------------------------

//*CONNECT COLLECTION
const User = mongoose.model( 'users', UserSchema );


//*----------------QUERYS------------------------------------------------------------------------------------------

//?----------------(QUERYS FOR USERS)----------------------------
const UserModel = {

    createUser : function(newUser) {
        return User.create(newUser) 
    },
    getUserByUsername : function( username ){
        return User.findOne({ username });
    },
    getUserByEmail : function( email ){
        return User.findOne({ email });
    },
    getUserByID : function( _id ){
        return User.findOne({ _id });
    },
    updateUser: function(_id, adminupdated){
        return User.findOneAndUpdate({_id}, {$set : adminupdated}, {new:true})
    },

    //TODO INSERT MORE QUERYS

}

//*----------------QUERYS END--------------------------------------------------------------------------------------

//* EXPORT MODEL (QUERY OBJECTS)
module.exports = {UserModel};