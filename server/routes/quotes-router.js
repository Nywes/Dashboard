const express = require('express')
const quotesCtrl = require('../controllers/quotes-controller')

const quotesRouter = express.Router()

quotesRouter.get('/quotes_api/quotes/:query', quotesCtrl.searchQuote);

quotesRouter.get('/quotes_api/test', (req, res) => res.send("Works"));

module.exports = quotesRouter