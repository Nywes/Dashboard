const express = require('express')
const quotesCtrl = require('../controllers/quotes-controller')

const quotesRouter = express.Router()

quotesRouter.get('/api/quotes_api/quotes/:query', quotesCtrl.searchQuote);
quotesRouter.get('/api/quotes_api/quotes-tag/:tag', quotesCtrl.getQuotesByTag);

quotesRouter.get('/api/quotes_api/test', (req, res) => res.send("Works"));

module.exports = quotesRouter