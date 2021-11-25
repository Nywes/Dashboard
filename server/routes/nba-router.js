const express = require('express')
const nbaCtrl = require('../controllers/nba-controller')

const nbaRouter = express.Router()

nbaRouter.get('/nba_api/teams/:teamname', nbaCtrl.getNBATeam);
nbaRouter.get('/nba_api/players/:playername', nbaCtrl.getNBAPlayer);
nbaRouter.get('/nba_api/player_url/:playername', nbaCtrl.getPlayerImageUrl);

nbaRouter.get('/nba_api/test', (req, res) => res.send("Works"));


module.exports = nbaRouter