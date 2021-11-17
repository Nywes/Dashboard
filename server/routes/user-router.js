const express = require('express')
const UserCtrl = require('../controllers/user-controller')

const router = express.Router()

router.post('/user', UserCtrl.createUser)
// router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/user/:id', UserCtrl.deleteUser)
router.get('/user/:id', UserCtrl.getUserById)
router.get('/users', UserCtrl.getUsers)

module.exports = router