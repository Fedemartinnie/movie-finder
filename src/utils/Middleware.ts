import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const user: IUser | null = await User.findOne({ accessToken: token });

    if (!user) {
      return res.status(401).json({ message: 'User not found or invalid token' });
    }

    // Extraer directamente el userId del objeto de usuario y asignarlo a req.user
    req.user = user.id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication error' });
  }
};

export default isAuthenticated;
