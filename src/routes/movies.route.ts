import express  from "express"

let router = express.Router()
const moviesController = require('../controllers/movies.controller')
// var authorization = require()

router.get('/', (_req, res) => {
  res.send('Movies Route !!!')
})


//falta agregar el Authorization --> cuando tengamos el googleSignIn
router.get('/results', moviesController.moviesResult)
router.get('/:id', moviesController.getMovie)
router.put('/rating/:id', moviesController.rate)



module.exports = router