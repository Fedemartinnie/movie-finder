import express, { Router, Request, Response } from 'express';
import * as movieController from '../controllers/Movie';

const router: Router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    res.send('Movies Route !!!');
});

router.get('/results', async (req: Request, res: Response) => {
    const name = req.query.name as string | undefined;
    if (!name) {
        return res.status(400).json({ message: 'Missing name parameter' });
    }

    try {
        const movies = await movieController.search(name);
        res.status(200).json({ data: movies, message: 'Movies found' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


router.get('/results', async (req: Request, res: Response) => {
  const name = req.query.name as string | undefined;
  if (!name) {
      return res.status(400).json({ message: 'Missing name parameter' });
  }

  try {
      const movies = await movieController.search(name);
      res.status(200).json({ data: movies, message: 'Movies found' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/genre', async (req: Request, res: Response) => {
  const genre = req.query.genre as string | undefined;
  if (!genre) {
      return res.status(400).json({ message: 'Missing genre parameter' });
  }

  try {
      const movies = await movieController.filterByGenre(genre);
      res.status(200).json({ data: movies, message: 'Movies found by genre' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
    const movieId = req.params.id;
    try {
        const movie = await movieController.getMovie(movieId);
        if (movie) {
            res.status(200).json({ data: movie, message: 'Movie found' });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/rating/:id', async (req: Request, res: Response) => {
    const movieId = req.params.id;
    const rate = req.body.rate;
    const userId = req.body.userId;
    try {
        const newOverallRating = await movieController.rate(rate, movieId, userId);
        res.status(200).json({ data: newOverallRating, message: 'The movie was successfully rated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
