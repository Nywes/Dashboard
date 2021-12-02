const express = require('express')
const prefsCtrl = require('../controllers/prefs-controller');

const prefsRouter = express.Router()

prefsRouter.get('/prefs_api/prefs/:token', prefsCtrl.getUserPrefs)

prefsRouter.post('/prefs_api/prefs', prefsCtrl.setUserPrefs)
prefsRouter.put('/prefs_api/update_prefs', prefsCtrl.updateUserPrefs);

prefsRouter.get('/prefs_api/test', (req, res) => res.send("Works"));

module.exports = prefsRouter