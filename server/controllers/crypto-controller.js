var axios = require("axios");
const { Promise } = require("mongoose");
fs = require('fs');

const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY;

getCryptoOptions = async (req, res) =>
{
    // * {value: x, label: y}
    var totalOptions = []

    // * open file
    await fs.readFile(require('path').resolve(__dirname, '../resources/cryptocurrencies.json'), 'utf8', async function (err, data) {
        if (!err) {
            var cryptoCurrenciesJSON = JSON.parse(data);

            for (const [abbreviation, cryptocurrency] of Object.entries(cryptoCurrenciesJSON)) {
                totalOptions.push({value: abbreviation, label: cryptocurrency});
            }
        }

        console.log("Finished cryptos");

        await fs.readFile(require('path').resolve(__dirname, '../resources/currencies.json'), 'utf8', function (err, data) {
            if (!err) {
                var currenciesJSON = JSON.parse(data);

                for (let i = 0; i < currenciesJSON.length; i++) {
                    const element = currenciesJSON[i];
                    totalOptions.push({value:element.abbreviation, label:element.currency});
                }
            }

            console.log("Finished currencies");
            console.log("After awaits");
            return res.status(200).json({
                success: totalOptions.length > 0 ? true : false,
                options: totalOptions,
            });
        });

    });
}

getCryptoValueRawData = async (currencyA, currencyB, callback) =>
{
    // * cf: https://nomics.com/docs/#operation/getCurrenciesTicker
    const options = {
        method: 'GET',
        url: `https://api.nomics.com/v1/currencies/ticker`,
        params: {
            key: CRYPTO_API_KEY,
            ids: "BTC", // comma separated list of cryptos (BTC, ETH, XTZ, SOL, ...)
            convert: "EUR", // fiat currency (USD, EUR, AUD, ...), can also be a crypto currency !
            status: "active", // active, inactive, or dead
        }
    };

    if (currencyA != null && currencyA != "") {
        options.params.ids = currencyA;
    }
    if (currencyB != null && currencyB != "") {
        options.params.convert = currencyB;
    }

    await axios.request(options)
    .then(function (response) {
        callback(response);
    }).catch(function (error) {
        callback(null);
    });
}

getCryptoValue = async (req, res) =>
{
    var cryptoID = req.params.cryptoID;
    var convertedValueCurrency = req.params.targetCurrencyID;

    // * cf: https://nomics.com/docs/#operation/getCurrenciesTicker
    const options = {
        method: 'GET',
        url: `https://api.nomics.com/v1/currencies/ticker`,
        params: {
            key: CRYPTO_API_KEY,
            ids: "BTC", // comma separated list of cryptos (BTC, ETH, XTZ, SOL, ...)
            convert: "EUR", // fiat currency (USD, EUR, AUD, ...), can also be a crypto currency !
            status: "active", // active, inactive, or dead
        }
    };

    if (cryptoID != null && cryptoID != "") {
        options.params.ids = cryptoID;
    }
    if (convertedValueCurrency != null && convertedValueCurrency != "") {
        options.params.convert = convertedValueCurrency;
    }

    // ! await ??
    await axios.request(options)
    .then(function (response) {
        console.log(response.data);
        return res.status(200).json({
            success: true,
            data: response.data,
            message: 'Found crypto info!',
        });
    }).catch(function (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error,
        });
    });
}

module.exports = {
    getCryptoValue,
    getCryptoOptions,
    getCryptoValueRawData
}