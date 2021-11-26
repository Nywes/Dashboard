const express = require('express')
const unsplashCtrl = require('../controllers/unsplash-controller')

const unsplashRouter = express.Router()

unsplashRouter.get('/unsplash_api/pictures/:query', unsplashCtrl.searchPictures);

unsplashRouter.get('/unsplash_api/test', (req, res) => res.send("Works"));

module.exports = unsplashRouter