const express = require('express')
const UserCtrl = require('../controllers/user-controller')
const GoogleCtrl = require('../controllers/google-user-controller')

const router = express.Router()


router.post('/api/user_api/google_user', GoogleCtrl.createGoogleUser)
router.get('/api/user_api/google_connect/:email', GoogleCtrl.connectGoogleUser);

router.post('/api/user_api/user', UserCtrl.createUser)
// router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/api/user_api/user/:id', UserCtrl.deleteUser)
router.get('/api/user_api/user/by_id/:id', UserCtrl.getUserById)
router.get('/api/user_api/user/by_username/:userName', UserCtrl.getUserByName)
router.post('/api/user_api/authenticate_user', UserCtrl.authenticateUser)

router.get('/api/user_api/users', UserCtrl.getUsers)

module.exports = router