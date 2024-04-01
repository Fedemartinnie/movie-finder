import {Request, Response, NextFunction } from "express"
var moviesService = require('../services/movies.services')

// const _this = this

exports.latestMovies = async (req: Request, res: Response, _next: NextFunction) => {
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10
    try {
        const movies = await moviesService.latestMovies(page, limit)
        return res.status(200).json({status: 200, data: movies, message: "Succesfully  movies Recieved"})
    } catch (e: any) {
        return res.status(500).json({status: 500, message: "Error en el servidor"})
    }
}