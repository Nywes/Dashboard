const express = require('express')
const hearthstoneCtrl = require('../controllers/hearthstone-controller')

const HSRouter = express.Router()

HSRouter.get('/api/hs_api/cards/:query', hearthstoneCtrl.getCard);

HSRouter.get('/api/hs_api/test', (req, res) => res.send("Works"));

module.exports = HSRouter