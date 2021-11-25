const express = require('express')
const cryptoCTRL = require('../controllers/crypto-controller')

const cryptoRouter = express.Router()

cryptoRouter.get('/crypto_api/currencies/:cryptoID&:targetCurrencyID', cryptoCTRL.getCryptoValue);

cryptoRouter.get('/crypto_api/test', (req, res) => res.send("Works"));


module.exports = cryptoRouter