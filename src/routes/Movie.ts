import express  from "express"
import authorizationMiddleware from '../utils/Middleware';

const moviesController = require('../controllers/Movie')
const router = express.Router();


router.get('/results',authorizationMiddleware, moviesController.moviesResult);
router.get('/:id',authorizationMiddleware, moviesController.getMovie);
router.put('/rating/:id',authorizationMiddleware, moviesController.rate);

export default router;