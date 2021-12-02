var axios = require("axios");
fs = require('fs');

// ! put in nba-model ??
const teamDict = {
    "atlanta": 1,
    "hawks": 1,
    "boston": 2,
    "celtics": 2,
    "brooklyn": 3,
    "nets": 3,
    "charlotte": 4,
    "hornets": 4,
    "chicago": 5,
    "bulls": 5,
    "cleveland": 6,
    "cavaliers": 6,
    "dallas": 7,
    "mavericks": 7,
    "denver": 8,
    "nuggets": 8,
    "detroit": 9,
    "pistons": 9,
    "san francisco": 10,
    "warriors": 10,
    "houston": 11,
    "rockets": 11,
    "indiana": 12,
    "pacers": 12,
    "la": 13,
    "clippers": 13,
    "los angeles": 14,
    "lakers": 14,
    "memphis": 15,
    "grizzlies": 15,
    "miami": 16,
    "heat": 16,
    "milwaukee": 17,
    "bucks": 17,
    "minnesota": 18,
    "timberwolves": 18,
    "new orleans": 19,
    "pelicans": 19,
    "new york": 20,
    "knicks": 20,
    "oklahoma city": 21,
    "thunder": 21,
    "orlando": 22,
    "magic": 22,
    "philadelphia": 23,
    "sixers": 23,
    "phoenix": 24,
    "suns": 24,
    "portland": 25,
    "trail blazers": 25,
    "sacramento": 26,
    "kings": 26,
    "san antonio": 27,
    "spurs": 27,
    "toronto": 28,
    "raptors": 28,
    "utah": 29,
    "jazz": 29,
    "washington": 30,    
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