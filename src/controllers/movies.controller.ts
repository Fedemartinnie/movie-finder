import {Request, Response, NextFunction } from "express"
import { movie } from "../types"
var moviesService = require('../services/movies.services')

// const _this = this

exports.latestMovies = async (req: Request, res: Response, _next: NextFunction) => {
    const page = req.query.page ? req.query.page : 1
    const limit = 10

    try {
        const movies : Array<movie> = await moviesService.latestMovies(page, limit)
        console.log(movies)
        if(movies.length > 0){
            return res.status(200).json({status: 200, data: movies, message: "Succesfully  movies Recieved"})
        }
        return res.status(404).json({status: 404, message: "No data available"})
    } catch (e: any) {
        return res.status(500).json({status: 500, message: "Error en el servidor"})
    }
}