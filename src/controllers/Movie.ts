import { Movie, MovieSummary } from '../types';
const MovieModel = require('../models/Movie');


export const latest = async (page: number, limit: number) => {
    try {
        const movies: Movie[] | null = await MovieModel.find()
            .select('_id title releaseYear overallRating genre images')
            .sort({ releaseYear: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return movies;
    } catch (error) {
        throw new Error('Error fetching latest movies');
    }
};

export const search = async (name: string) => {
    try {
        const movies: MovieSummary[] = await MovieModel.find({
            $or: [
                { title: new RegExp(name, 'i') },
                { cast: { $regex: new RegExp(name, 'i') } }
            ]
        }).select('_id title releaseYear overallRating genre images');
        return movies;
    } catch (error) {
        throw new Error('Error searching movies');
    }
};

export const filterByGenre = async (genre: string) => {
    try {
        const movies: MovieSummary[] = await MovieModel.find({
            genre: new RegExp(genre, 'i')
        }).select('_id title releaseYear overallRating images genre');
        return movies;
    } catch (error) {
        throw new Error('Error filtering movies by genre');
    }
};

export const rate = async (rate: number, movieId: string, userId: string) => {
    try {
        const movie = await MovieModel.findById(movieId).select('overallRating ratingsCount ratings');
        const userRatingIndex = movie.ratings.findIndex((rating: { userId: string }) => rating.userId === userId);
        const initRatingsCount = movie.ratingsCount;
        const newRating = { userId, rate };
        
        if (userRatingIndex === -1) {
            movie.ratingsCount += 1;
            movie.ratings.push(newRating);
        } else {
            movie.overallRating = ((movie.overallRating * initRatingsCount) - movie.ratings[userRatingIndex].rate) / (initRatingsCount - 1);
            movie.ratings[userRatingIndex].rate = rate;
        }

        const newRate: number = ((movie.overallRating * initRatingsCount) + rate) / (movie.ratingsCount);
        movie.overallRating = newRate;

        const newOverallRating = await movie.save();
        return newOverallRating;
    } catch (error) {
        throw new Error('Error rating the movie');
    }
};

export const getMovie = async (movieId: string) => {
    try {
        const movie = await MovieModel.findById(movieId);
        return movie;
    } catch (error) {
        throw new Error('Error getting the movie');
    }
};
