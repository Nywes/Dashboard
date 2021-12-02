const express = require('express')
const cryptoCTRL = require('../controllers/crypto-controller')

const cryptoRouter = express.Router()

cryptoRouter.get('/crypto_api/currencies/:cryptoID&:targetCurrencyID', cryptoCTRL.getCryptoValue);
cryptoRouter.get('/crypto_api/currencyOptions', cryptoCTRL.getCryptoOptions);
cryptoRouter.get('/crypto_api/onlyCryptoOptions', cryptoCTRL.getOnlyCryptoOptions);

cryptoRouter.get('/crypto_api/test', (req, res) => res.send("Works"));


module.exports = cryptoRouter