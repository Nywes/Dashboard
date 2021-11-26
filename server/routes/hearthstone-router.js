const express = require('express')
const hearthstoneCtrl = require('../controllers/hearthstone-controller')

const HSRouter = express.Router()

HSRouter.get('/hs_api/cards/:query', hearthstoneCtrl.getCard);

HSRouter.get('/hs_api/test', (req, res) => res.send("Works"));

module.exports = HSRouter