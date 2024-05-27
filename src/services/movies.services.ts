//import { string } from 'zod'
import { movie } from '../types'
const MovieModel = require('../models/movies.model')

//agregar keys de la nueva BD (trailers , portrait, landscape, etc)
exports.moviesResult = async (page: number, limit: number, name: string | null, sortByDate: number | null, sortByRating: number | null, genre: string | null) => {
    let sortParam: any = {};
    
    if(sortByDate){
        sortParam.releaseYear = Number(sortByDate)
        console.log("date ",sortByDate)
    }
    if (sortByRating) {
        sortParam.overallRating = Number(sortByRating)
        console.log("rating ", sortByRating)
    }
    
    console.log('sortParam --> ',sortParam)

    const query: any = {};

    if (name) {
        query.$or = [
            { title: { $regex: new RegExp(name, 'i') } },
            { 'cast.name': { $regex: new RegExp(name, 'i') } }
        ];
    }
    console.log('genre ',genre)
    console.log(genre!==null)
    if (genre){
        query.genres = { $regex: new RegExp(genre, 'i') }
    }

    console.log('query ----> ',query)
    console.log('query.genres ----> ',query.genres)


    try {
        // const projection = {
        //     cast: { $slice: 15 },
        //     'images.backdrops': { $slice: 10 },
        //     'images.logos': { $slice: 10 },
        //     'images.posters': { $slice: 10 }
        // }
        const movies: Array<movie> | null = await MovieModel.find(query)
            .select({
            '_id': 1,
            'title': 1,
            'releaseYear': 1,
            'genres': 1,
            'overallRating': 1,
            'images.backdrops': { $slice: 2 },            
            'images.posters': { $slice: 2 },
            // 'cast': { $slice: 12 }
        })
            .sort(sortParam)
            .skip((page - 1) * limit)
            .limit(limit);
        return movies;

    }
    catch {
        throw new Error()
    }

}

// Rate Movie
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

// Movie View: All Data
exports.getMovie = async (movieId: number) => {
    try{
        const movie = await MovieModel.findById(movieId)
            .select({
                _id: 1,
                title: 1,
                releaseYear: 1,
                duration: 1,
                genres: 1,
                trailer: 1,
                plot: 1,
                'overallRating': 1,            
                'images.backdrops': { $slice: 10 },
                cast: { $slice: 12 },
                director: { $slice: 3 },
            })
        return movie
    }
    catch{
        throw new Error('Error searching the movie')
    }
}