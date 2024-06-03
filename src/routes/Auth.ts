import express from 'express';
import passport from '../Passport'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import * as UserController from '../controllers/User';

const router = express.Router();

// Ruta para iniciar la autenticación con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta para manejar el callback después de la autenticación
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Autenticación exitosa, redirigir al frontend o alguna otra página
    //res.redirect('http://localhost:3000/dashboard'); // Cambia esta URL según tu aplicación frontend
  }
);

// Ruta para manejar los datos del usuario desde el frontend
router.post('/auth/google/callback', async (req, res) => {
  try {
    const { idToken, user } = req.body; // Accede al token y los datos del usuario
    console.log('Token recibido desde el frontend:', idToken);
    console.log('Datos del usuario recibidos desde el frontend:', user);

    // Aquí puedes manejar los datos del usuario y guardar en la base de datos si es necesario
    await UserController.registerUser(user, idToken);

    res.status(200).send('Usuario registrado correctamente');
  } catch (error) {
    console.error('Error al procesar el token de Google:', error);
    res.status(500).send('Error al procesar el token de Google');
  }
});

router.get('/logout', UserController.logout);

export default router;
