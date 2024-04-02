//import { Movie }  from '../models/movies.model'
import { movie } from '../types'
const MovieModel = require('../models/movies.model')


exports.latestMovies = async (page: number, limit: number) => {
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
        throw new Error ()    
    }
}

exports.search = async (name: string) => {
    try { 
        const movies: Array<movie> = await MovieModel.find({
            $or:[
                {title: new RegExp(name, 'i')}, 
                {cast: {$regex: new RegExp(name, 'i')}
            }]
        }).select('title')

        if(movies.length === 0){
            //lógica para flexibilizar la busqueda si no hay resultados
        }
        return movies        
    }
    catch{
        throw new Error()
    }
}