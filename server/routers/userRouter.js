const express = require( 'express' );
const UserRouter = express.Router();
const {UserController}  = require('../controllers/userController');



module.exports = { UserRouter };