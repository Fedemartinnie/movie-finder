import {Request, Response, NextFunction } from "express"
import { MovieSummary, movie } from "../types"
const moviesService = require('../services/movies.services')

// const _this = this


exports.moviesResult = async (req: Request, res: Response, _next: NextFunction) => {
    const page = req.query.page ?? 1
    const limit = req.query.limit ?? 21
    const name = req.query.name ?? null
    const sortByRating = ( req.query.sortByRating) ?? null
    const sortByDate = (req.query.sortByDate) ?? null
    const genre = req.query.genre ?? null
    // console.log('page controller---> ', page)
    // console.log('query controller---> ', req.query)

    try {
        const movies: Array<MovieSummary> = await moviesService.moviesResult(page, limit, name, sortByDate, sortByRating, genre)
        // console.log('movies --> ', movies)
        if(movies.length > 0){
            return res.status(200).json({data: movies, message: 'Succesfully movies recieved'})
        }
        if(movies.length === 0)
            return res.status(404).json({message: 'No data available'})        
    } catch {
        return res.status(500).json({message: 'Server Error'})
    }
}


exports.rate = async (req: Request, res: Response) => {
    const movieId = req.params.id
    const rate = req.body.rate
    const userId = req.user
    try {
        const movie : movie = await moviesService.rate(rate, movieId, userId)
        if(movie){
            return res.status(200).json({data: movie, message: 'The movie was successfully rated'})
        }
        return res.status(404).json({message: "Error while rating the movie"})
    }
    catch {
        return res.status(500).json({message: 'Server Error'})
    }
}


exports.getMovie = async (req: Request, res:Response) => {
    const movieId = req.params.id;

    try {
        const movie = await moviesService.getMovie(movieId);
        console.log("moviee ----> \n", movie);

        if (movie) {
            return res.status(200).json(movie);
        } else {
            return res.status(404).json({ message: 'The movie was not found' });
        }
    } catch (error) {
        console.error('Error fetching movie:', error)        
        return res.status(500).json({ message: "Server Error" });
    }
};