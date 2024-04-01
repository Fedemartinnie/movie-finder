//import { Movie }  from '../models/movies.model'
import { movie } from '../types'
const MovieModel = require('../models/movies.model')


exports.latestMovies = async function (page: number, limit: number) {
    console.log('page',page)
    console.log('limit',limit)
    try{
        /*const movies = await movie.find()
            .sort({releaseYear: -1})
            .skip((page - 1) * limit)
            .limit(limit)
        return movies*/
        console.log("\nhola buscando pelicula\n")
        const moviee: movie | null = await MovieModel.findOne().select();
        console.log('MOVIE: ',moviee)
        return moviee;
    }
    catch (e){
        console.log("\nERROR ")
        throw new Error ();
        
    }
}