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

getNBATeam = async (req, res) =>
{
    var name = req.params.teamname;
    // créer les options
    name = name.toLowerCase();

    const options = {
        method: 'GET',
        url: `https://free-nba.p.rapidapi.com/teams`,
        params: {page: '0'}, // * useless
        headers: {
          'x-rapidapi-host': 'free-nba.p.rapidapi.com',
          'x-rapidapi-key':  NBAAPIKey
        }
    };

    if (name === "all") {
        options.url = "https://free-nba.p.rapidapi.com/teams";
    } else {
        // * boucler sur tout le dictionnaire et faire un filter "LIKE" name
        var id = teamDict[name];

        options.url += `/${id}`;
    }

    // ! await ??
    await axios.request(options)
    .then(function (response) {
        console.log(response.data);
        return res.status(200).json({
            success: true,
            team: response.data,
            message: 'Found team(s)!',
        });
    }).catch(function (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error,
        });
    });
}


getNBAPlayer = async (req, res) =>
{
    // * get player name (separated by + character ??)
    var name = req.params.playername;

    name = name.replace("+", " ");
    // créer les options
    name = name.toLowerCase();

    var options = {
      method: 'GET',
      url: 'https://free-nba.p.rapidapi.com/players',
      params: {page: '0', per_page: '25'},
      headers: {
        'x-rapidapi-host': 'free-nba.p.rapidapi.com',
        'x-rapidapi-key': NBAAPIKey
      }
    };

    if (name === "all") {
        // plein de requetes en boucle pour remplir un tableau de 3739 joueurs ??
    } else {
        options.params = {page: '0', per_page: '25', search: name};
    }

    // ! await ??
    await axios.request(options).then(function (response) {
        console.log(response.data);
        return res.status(200).json({
            success: true,
            data: response.data,
            message: 'Found player(s)!',
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
    getNBATeam,
    getNBAPlayer
}