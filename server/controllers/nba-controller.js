//import axios from 'axios'


var axios = require("axios");

// ! put in nba-model ??
const teamDict = {
    "hawks": 1,
    "celtics": 2,
    "nets": 3,
    "hornets": 4,
    "bulls": 5,
    "cavaliers": 6,
    "mavericks": 7,
    "nuggets": 8,
    "pistons": 9,
    "warriors": 10,
    "rockets": 11,
    "pacers": 12,
    "clippers": 13,
    "lakers": 14,
    "grizzlies": 15,
    "heat": 16,
    "bucks": 17,
    "timberwolves": 18,
    "pelicans": 19,
    "knicks": 20,
    "thunder": 21,
    "magic": 22,
    "sixers": 23,
    "suns": 24,
    "trail blazers": 25,
    "kings": 26,
    "spurs": 27,
    "raptors": 28,
    "jazz": 29,
    "wizards": 30
};
const NBAAPIKey = process.env.NBA_API_KEY;

getNBATeam = (req, res) =>
{
    var name = req.params.teamname;
    // créer les options
    name = name.toLowerCase();

    // * boucler sur tout le dictionnaire et faire un filter "LIKE" name

    var id = teamDict[name];

    const options = {
        method: 'GET',
        url: `https://free-nba.p.rapidapi.com/teams/${id}`,
        params: {page: '0'}, // * useless
        headers: {
          'x-rapidapi-host': 'free-nba.p.rapidapi.com',
          'x-rapidapi-key':  NBAAPIKey
        }
    };

    axios.request(options)
    .then(function (response) {
        console.log(response.data);
        return res.status(200).json({
            success: true,
            data: response.data,
            message: 'Found team!',
        });
    }).catch(function (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error,
        });
    });

}

// todo search player

module.exports = {
    getNBATeam
}