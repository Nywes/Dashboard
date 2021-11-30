var axios = require("axios");

getQuotesByTag = async (req, res) =>
{
    var tag = req.params.tag;

    const options = {
        method: 'GET',
        url: `https://api.quotable.io/quotes`,
        params: {tags:tag, page: '1'},
    };

    // ! await ??
    await axios.request(options)
    .then(function (response) {
        console.log(response.data);

        quoteInfo = response.data;
        return res.status(200).json({
            success: true,
            quotes: quoteInfo,
            message: 'Found quote(s)!',
        });
    }).catch(function (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error,
        });
    });
}

searchQuote = async (req, res) =>
{
    var userQuery = req.params.query;

    userQuery = userQuery.replace("+", " ");
    // créer les options
    userQuery = userQuery.toLowerCase();

    const options = {
        method: 'GET',
        url: `https://api.quotable.io/search/quotes`,
        params: {query:userQuery, page: '1'}, // * useless
        // headers: {
        //   'x-rapidapi-host': 'free-nba.p.rapidapi.com',
        //   'x-rapidapi-key':  NBAAPIKey
        // }
    };

    if (userQuery === "random") {
        options.url = "https://api.quotable.io/random"
        params = {};
    }

    // ! await ??
    await axios.request(options)
    .then(function (response) {
        console.log(response.data);

        quoteInfo = response.data;
        if (userQuery !== "random") {
            quoteInfo = response.data.results[Math.floor(Math.random() * response.data.results.length)]
        }
        return res.status(200).json({
            success: true,
            quote: quoteInfo,
            message: 'Found quote(s)!',
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
    searchQuote,
    getQuotesByTag
}