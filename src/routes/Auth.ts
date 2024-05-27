import express from 'express';
import passport from '../Passport'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import * as UserController from '../controllers/User';


const router = express.Router();

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => {
    res.redirect('/home'); // Redirige a la página principal u otra página tras la autenticación exitosa
  }
);

router.get('/logout', UserController.logout);

export default router;
