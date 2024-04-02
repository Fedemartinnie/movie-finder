import {Request, Response, NextFunction } from "express"
import { movie } from "../types"
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
            return res.status(200).json({status: 200, data: movies, message: "Succesfully movies Recieved"})
        }
        return res.status(404).json({status: 404, message: "No data available"})
    } catch (e: any) {
        return res.status(500).json({ status: 500, message: "Server Error" });
    }
    
}

// title || actor
exports.search = async (req: Request, res: Response) => {
    const name = req.query.name
    console.log("------------------------\NNAME: ",name)
    try {
        const movies: Array<movie> = await moviesService.search(name)
        if(movies.length > 0) {
            return res.status(200).json({status:200, data: movies, message: "movies found"})
        }
        return res.status(404).json({status: 404, message: "No results found for the search term."})
    }
    catch {
        return res.status(500).json({status: 500, message: "Server Error"})
    }
}