const express = require('express')
const cryptoCTRL = require('../controllers/crypto-controller')

const cryptoRouter = express.Router()

cryptoRouter.get('/api/crypto_api/currencies/:cryptoID&:targetCurrencyID', cryptoCTRL.getCryptoValue);
cryptoRouter.get('/api/crypto_api/currencyOptions', cryptoCTRL.getCryptoOptions);
cryptoRouter.get('/api/crypto_api/onlyCryptoOptions', cryptoCTRL.getOnlyCryptoOptions);

cryptoRouter.get('/api/crypto_api/test', (req, res) => res.send("Works"));


module.exports = cryptoRouter