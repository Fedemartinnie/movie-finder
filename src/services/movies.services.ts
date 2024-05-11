//import { string } from 'zod'
import { movie, MovieSummary } from '../types'
const MovieModel = require('../models/movies.model')

exports.latestMovies = async (page: number, limit: number) => {    
    try{
        const movies: Array<movie> | null = await MovieModel.find()
            .select('_id title releaseYear overallRating genre images')
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
        const movies: Array<MovieSummary> = await MovieModel.find({
            $or:[
                {title: new RegExp(name, 'i')}, 
                {cast: {$regex: new RegExp(name, 'i')}
            }]
        }).select('_id title releaseYear overallRating genre images')

        if(movies.length === 0){
            //lógica para flexibilizar la busqueda si no hay resultados
        }
        return movies        
    }
    catch{
        throw new Error()
    }
}


exports.filterByGenre = async (genre: string) => {
    try{
        const movies: Array<MovieSummary> = await MovieModel.find({
                genre: new RegExp(genre, 'i')
            }).select('_id title releaseYear overallRating images genre')
        return movies
    }
    catch {
        throw new Error()
    }
}


exports.rate = async (rate: number, movieId: string, userId: string) => {    
    try{        
        const movie = await MovieModel.findById(movieId).select('overallRating ratingsCount ratings')
        const userRatingIndex = movie.ratings.findIndex((rating: {userId: string}) => rating.userId === userId);
        const initRatingsCount = movie.ratingsCount
        const newRating = {userId, rate}
        //si el usuario no califico , incremento 1 al contador y lo agrego a ratings
        if( userRatingIndex === -1 ){// -!movie.ratings.some((rating: {userId: string}) => rating.userId === userId)){
            movie.ratingsCount += 1
            movie.ratings.push(newRating)            
        }
        else{
            movie.overallRating = ((movie.overallRating * initRatingsCount) - movie.ratings[userRatingIndex].rate) / (initRatingsCount -1)
            movie.ratings[userRatingIndex].rate = rate               
        }
        const newRate : number = ((movie.overallRating * initRatingsCount) + rate) / (movie.ratingsCount)
        movie.overallRating = newRate
        const newOverallRating = await movie.save()
        return newOverallRating
    }
    catch{
        throw new Error('Error Saving the rate');
    }
}


exports.getMovie = async (movieId: number) => {
    try{
        const movie = await MovieModel.findById(movieId)
        return movie
    }
    catch{
        throw new Error('Error searching the movie')
    }
}