const express = require( 'express' );
const UserRouter = express.Router();
const {UserController}  = require('../controllers/userController');

UserRouter.route('/').get(UserController.try)

UserRouter.route('/login').post(UserController.login)

UserRouter.route('/register').post(UserController.createNewUser)

module.exports = { UserRouter };