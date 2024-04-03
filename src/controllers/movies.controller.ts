import {Request, Response, NextFunction } from "express"
import { MovieSummary, movie } from "../types"
var moviesService = require('../services/movies.services')

// const _this = this

//  Home Movies
exports.latestMovies = async (req: Request, res: Response, _next: NextFunction) => {
    const page = req.query.page ? req.query.page : 1
    const limit = 10

    try {
        const movies : Array<movie> = await moviesService.latestMovies(page, limit)
        console.log(movies)
        if(movies.length > 0){
            return res.status(200).json({data: movies, message: "Succesfully movies Recieved"})
        }
        return res.status(404).json({message: "No data available"})
    } catch (e: any) {
        return res.status(500).json({message: "Server Error" });
    }
    
}

// title || actor
exports.search = async (req: Request, res: Response) => {
    const name = req.query.name
    console.log("------------------------\NNAME: ",name)
    try {
        const movies: Array<movie> = await moviesService.search(name)
        if(movies.length > 0) {
            return res.status(200).json({data: movies, message: "movies found"})
        }
        return res.status(404).json({message: "No results found for the search term."})
    }
    catch {
        return res.status(500).json({message: "Server Error"})
    }
}

exports.filterByGenre = async (req: Request, res: Response) => {
    const genre = req.query.genre
    try{
        const movies: Array<movie> = await moviesService.filterByGenre(genre)
        if(movies.length > 0){
            return res.status(200).json({data: movies, message: "movies found by genre"})
        }
        return res.status(404).json({message: 'No results found for the specified genre'})
    }
    catch{
        return res.status(500).json({message: 'Server Error'})
    }
}


exports.rate = async (req: Request, res: Response) => {
    const movieId = req.params.id
    const rate = req.body.rate
    const userId = req.body.userId
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


exports.getMovie = async (req: Request, res: Response) => {
    const movieId = req.query.id
    try{
        const movie: movie = await moviesService.getMovie(movieId)
        if(movie){
            return movie
        }
        return res.status(404).json({message: 'The movie was not found'})
    }
    catch{
        return res.status(500).json({message: "Server Error"})
    }
}