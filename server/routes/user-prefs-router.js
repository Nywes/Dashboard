const express = require('express')
const prefsCtrl = require('../controllers/prefs-controller');

const prefsRouter = express.Router()

prefsRouter.get('/api/prefs_api/prefs/:token', prefsCtrl.getUserPrefs)

prefsRouter.post('/api/prefs_api/prefs', prefsCtrl.setUserPrefs)
prefsRouter.put('/api/prefs_api/update_prefs', prefsCtrl.updateUserPrefs);

prefsRouter.get('/api/prefs_api/test', (req, res) => res.send("Works"));

module.exports = prefsRouter