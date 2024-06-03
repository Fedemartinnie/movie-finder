import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { OAuth2Client } from 'google-auth-library';
import { Profile } from 'passport';
import { HydratedDocument } from 'mongoose';

// Registro
export async function registerUser(userProfile: any, token: string): Promise<void> {
  try {
    // Asegúrate de que todos los campos necesarios estén presentes y asignados
    const userId = userProfile.id || userProfile.userId;
    const name = userProfile.givenName || userProfile.name || '';
    const lastname = userProfile.familyName || userProfile.lastname || '';
    const email = userProfile.email || '';
    const profileImage = userProfile.photo || userProfile.profileImage || '';
    
    if (!userId || !name || !lastname || !profileImage) {
      throw new Error('Faltan campos requeridos para registrar el usuario');
    }

    const user = await User.findOne({ userId });
    if (!user) {
      // Si el usuario no existe, crea uno nuevo
      const newUser = new User({
        userId,
        name,
        lastname,
        email,
        profileImage,
        accessToken: token,
        refreshTokens: []
      });
      await newUser.save();
      console.log('Usuario registrado:', newUser);
    } else {
      console.log('El usuario ya está registrado:', user);
    }
  } catch (error) {
    console.error('Error al procesar el token de Google:', error);
    throw new Error('Error al registrar al usuario');
  }
}

const client = new OAuth2Client(process.env.CLIENTE_ID || '');

export const handleGoogleAuthCallback = async (accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
  try {
    console.log('Google profile received:', JSON.stringify(profile, null, 2));

    let user = await User.findOne({ userId: profile.id });

    if (!user) {
      user = new User({
        userId: profile.id,
        name: profile.name?.givenName || '',
        lastname: profile.name?.familyName || '',
        email: profile.emails?.[0]?.value || '',
        profileImage: profile.photos?.[0]?.value || '',
        accessToken: accessToken,
        refreshTokens: []
      });

      await user.save();
      console.log('New user created:', user);
    } else {
      user.accessToken = accessToken;
      await user.save();
      console.log('Existing user updated:', user);
    }

    return done(null, user);
  } catch (err) {
    console.error('Error during authentication:', err);
    return done(err, false);
  }
};

export const serializeUser = (user: HydratedDocument<any>, done: Function) => {
  console.log('usuario: ', user);
  done(null, user._id);
};

export const deserializeUser = async (id: string, done: Function) => {
  try {
    const user = await User.findById(id);
    console.log('Deserialized user:', user);
    done(null, user);
  } catch (error) {
    console.error('Error during deserialization:', error);
    done(error);
  }
};


// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Obtener un usuario por su ID
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Actualizar un usuario existente
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userData: IUser = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Eliminar un usuario por su ID
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (user) {
        user.accessToken = '';
        await user.save();

        req.logout((err) => {
          if (err) {
            return next(err);
          }
          req.session.destroy((err) => {
            if (err) {
              return next(err);
            }
            res.clearCookie('connect.sid');
            res.redirect('/auth/google'); // Redirige a la página de autenticación
          });
        });
      } else {
        res.status(404).send('User not found');
      }
    } else {
      res.redirect('/auth/google'); // Redirige a la página principal si el usuario no está autenticado
    }
  } catch (error) {
    console.error('Error during logout:', error);
    next(error);
  }
};
