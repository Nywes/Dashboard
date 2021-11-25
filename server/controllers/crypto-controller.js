var axios = require("axios");

const CRYPTO_API_KEY = process.env.CRYPTO_API_KEY;

// * we can provide a list of most popular cryptos maybe ?
// * or copy paste them into a json ?

getCryptoValue = async (req, res) =>
{
    var cryptoID = req.params.cryptoID;
    var convertedValueCurrency = req.params.targetCurrency;

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
    getCryptoValue
}