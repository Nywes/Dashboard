var axios = require("axios");

const RAPID_API_KEY = process.env.RAPID_API_KEY;

getCard = async (req, res) =>
{
    var query = req.params.query;
    query.replace("+", " ");
    // créer les options
    query = query.toLowerCase();

    const options = {
        method: 'GET',
        url: `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${query}`,
        params: {collectible: '1'},
        headers: {
          'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
          'x-rapidapi-key': RAPID_API_KEY
        }
    };

    await axios.request(options)
    .then(function (response) {
        console.log(response.data);
        return res.status(200).json({
            success: true,
            card: response.data,
            message: 'Found card!',
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
    getCard,
}