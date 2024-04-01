//import { Movie }  from '../models/movies.model'
import { movie } from '../types'
const MovieModel = require('../models/movies.model')


exports.latestMovies = async function (page: number, limit: number) {
    console.log('page',page)
    console.log('limit',limit)
    try{
        const movies: Array<movie> | null = await MovieModel.find()
            .select('_id title releaseYear overallRating ratingsCount genre')
            .sort({releaseYear: -1})
            .skip((page - 1) * limit)
            .limit(limit)
        return movies
    }
    catch (e){
        console.log("\nERROR ")
        throw new Error ();        
    }
}