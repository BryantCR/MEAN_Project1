const express = require( 'express' );
const UserRouter = express.Router();
const {UserController}  = require('../controllers/userController');

UserRouter
    .post('/register', UserController.createNewUser)

module.exports = { UserRouter };