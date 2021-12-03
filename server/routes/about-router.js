const express = require('express')
const aboutCtrl = require('../controllers/about-controller');

const aboutRouter = express.Router()

aboutRouter.get('/about.json', aboutCtrl.getDashboardInfo);

module.exports = aboutRouter