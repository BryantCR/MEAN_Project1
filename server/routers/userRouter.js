const express = require( 'express' );
const UserRouter = express.Router();
const {UserController}  = require('../controllers/userController');

UserRouter
    .get( '/welcome', UserController.loadLogin)

UserRouter
    .post('/register', UserController.createNewUser)

UserRouter
    .post('/login', UserController.login)

module.exports = { UserRouter };