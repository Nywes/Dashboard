var axios = require("axios");

//! attention
// https://help.unsplash.com/en/collections/1451694-api-guidelines

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_KEY = process.env.UNSPLASH_SECRET_KEY;

// * base endpoint https://api.unsplash.com/

searchPictures = async (req, res) =>
{
    var search = req.params.query;

    search = search.replace("+", " ");

    // créer les options
    search = search.toLowerCase();

    console.log("Searching with access key: ", UNSPLASH_ACCESS_KEY);

    const options = {
        method: 'GET',
        url: `https://api.unsplash.com/search/photos/`,
        params: {
            client_id: UNSPLASH_ACCESS_KEY,
            page: '1',
            content_filter: 'high',
            orientation: 'landscape',
            per_page: 6,
            query: search
        },
        // headers: {
        //   'x-rapidapi-host': 'free-nba.p.rapidapi.com',
        //   'x-rapidapi-key':  NBAAPIKey
        // }
    };

    // ! await ??
    await axios.request(options)
    .then(function (response) {
        console.log(response.data);

        var picturesObj = [];

        for (let i = 0; i < response.data.results.length; i++) {
            const element = response.data.results[i];

            picturesObj.push({url: element.urls.full, description: element.description, artistName: element.user.name, artistLink: element.user.links.self});
        }

        return res.status(200).json({
            success: true,
            pictures: picturesObj,
            message: 'Found pictures',
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
    searchPictures
}