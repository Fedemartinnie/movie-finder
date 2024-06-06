import express  from "express"

let router = express.Router()
const moviesController = require('../controllers/Movie')
// var authorization = require()

//falta agregar el Authorization --> cuando tengamos el googleSignIn
router.get('/results', moviesController.moviesResult)
router.get('/:id', moviesController.getMovie)
router.put('/rating/:id', moviesController.rate)
export default router;
