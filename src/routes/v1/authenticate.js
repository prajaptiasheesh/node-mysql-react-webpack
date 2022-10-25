var express = require('express');
var AuthenticationRouter = express.Router();

const { validate, addEditUserSchema, userLoginSchema }= require('@validators');
const { formatResponse }= require('@helpers')

const { registerController, loginController } = require('@controllers');


AuthenticationRouter.post('/register', validate(addEditUserSchema), formatResponse(registerController))
AuthenticationRouter.post('/login', validate(userLoginSchema), formatResponse(loginController))

module.exports = AuthenticationRouter