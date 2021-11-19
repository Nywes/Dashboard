const express = require('express')
const jwtCtrl = require('../controllers/jwt-controller')

const jwtRouter = express.Router()

jwtRouter.get('/validate_jwt/:token', jwtCtrl.validateJWT)

module.exports = jwtRouter