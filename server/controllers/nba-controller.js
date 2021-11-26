var axios = require("axios");
fs = require('fs');

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
const NBAAPIKey = process.env.RAPID_API_KEY;

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

        if (response.data.data.length == 0) {
            return(res.status(404).json({
                success: false,
                message: "Player not found"
            }))
        } else {

            return res.status(200).json({
                success: true,
                player: response.data,
                message: 'Found player(s)!',
            });
        }

    }).catch(function (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error,
        });
    });
}

// ?? loop from 2012 to 2021 if you really want everyone
//http://data.nba.net/data/10s/prod/v1/2019/players.json
//https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/1629630.png
getPlayerImageUrl = async (req, res) =>
{
    // * get player name (separated by + character ??)
    var name = req.params.playername;

    name = name.replace("+", " ");
    // créer les options
    name = name.toLowerCase();

    var found = false;
    var url = "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/logoman.png";

    // * open file
    await fs.readFile(require('path').resolve(__dirname, '../resources/nba_player_ids.csv'), 'utf8', function (err, data) {
        if (!err) {
            var lines = data.split('\n');
            // * loop over lines
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                var values = line.split(',');

                // todo or "like"
                if (values[0].toLowerCase() === name) {
                    var playerId = values[6];
                    console.log("Found player line: ", line);
                    found = true;
                    url = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/1040x760/${playerId}.png`;
                }
                if (found) {
                    break;
                }
            }
        }

        console.log("Returning");
        return res.status(found ? 200 : 404).json({
            success: found ? true : false,
            url: url,
            message: found ? 'Found player url !' : "Player url not found",
        });
    });
}

module.exports = {
    getNBATeam,
    getNBAPlayer,
    getPlayerImageUrl
}