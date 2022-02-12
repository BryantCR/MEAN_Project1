const express = require( 'express' );
const UserRouter = express.Router();
const {UserController}  = require('../controllers/userController');

UserRouter.route('/').get(UserController.try
    )
UserRouter.route('/log').post(UserController.login)

UserRouter.route('/reg').post(UserController.createNewUser)

module.exports = { UserRouter };