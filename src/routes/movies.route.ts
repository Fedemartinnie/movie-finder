import express  from "express"

let router = express.Router()
const moviesController = require('../controllers/movies.controller')
// var authorization = require()

router.get('/', (_req, res) => {
  res.send('Movies Route !!!')
})

router.get('/latest', moviesController.latestMovies)

module.exports = router