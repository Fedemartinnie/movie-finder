import { Request, Response, NextFunction } from 'express';
import Favorite from '../models/Favorite';

//! ADD FAVORITE
export const createFavorite = async (req: Request, res: Response, next: NextFunction) => {
  // const { movieId, moviePosterURL } = req.body;
  const movieId = req.body.id
  const moviePosterURL = req.body.poster
  console.log('movieId', movieId)
  console.log('movieId', moviePosterURL)
  const userId = req.user;
  console.log("user",userId);
  console.log("movie",movieId);
  console.log("poster",moviePosterURL);
  if (!userId || !movieId || !moviePosterURL) {
    return res.status(400).json({ error: 'Some of the parameters are missing: movieId, moviePosterURL are required.' });
  }

  try {
    const existingFavorite = await Favorite.findOne({ userId, movieId });
    if (existingFavorite) {
      return res.status(409).json({ error: 'The user has already added this movie to their favorites.' });
    }

    const newFavorite = new Favorite({
      userId,
      movieId,
      moviePosterURL
    });

    await newFavorite.save();

    return res.status(201).json(newFavorite);
  } catch (error) {
    next(error);
  }
};

//! ALL FAVORITES
export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  const idUser = req.user;

  if (!idUser) {
    return res.status(400).json({ error: 'Parameter idUser is required.' });
  }

  try {
    const favorites = await Favorite.find({ userId: idUser });

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found for this user.' });
    }

    return res.status(200).json(favorites);
  } catch (error) {
    next(error);
  }
};

//!DELETE
export const deleteFavorite = async (req: Request, res: Response, next: NextFunction) => {
  const { movieId } = req.params;
  const userId = req.user; // Obtén el userId del usuario autenticado desde req.user

  try {
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: No user ID found in the token.' });
    }
    console.log("user:",userId)
    console.log("movieId:",movieId)
    const deletedFavorite = await Favorite.findOneAndDelete({ userId, movieId });

    if (!deletedFavorite) {
      return res.status(404).json({ error: 'Favorite not found.' });
    }

    return res.status(200).json({ message: 'Favorite deleted successfully.', favorite: deletedFavorite });
  } catch (error) {
    next(error);
  }
};

