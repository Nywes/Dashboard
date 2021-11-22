const express = require('express')
const jwtCtrl = require('../controllers/jwt-controller')

const jwtRouter = express.Router()

jwtRouter.get('/jwt_api/validate_jwt/:token', jwtCtrl.validateJWT)

jwtRouter.get('/jwt_api/test', (req, res) => res.send("Works"));

module.exports = jwtRouter