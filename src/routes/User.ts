import express from 'express';
import * as userController from '../controllers/User';
import * as favoriteController from '../controllers/Favorite';
import authorizationMiddleware from '../utils/Middleware'; // Ajusta la ruta según tu estructura de proyecto

const router = express.Router();

// Rutas para operaciones CRUD de usuario
//router.get('/', userController.getUsers); // Obtener todos los usuarios
router.get('/', authorizationMiddleware, userController.getUserById); // Obtener un usuario por su ID
router.put('/', authorizationMiddleware, userController.updateUser); // Actualizar un usuario existente
router.delete('/:id', authorizationMiddleware, userController.deleteUser); // Eliminar un usuario por su ID

// Rutas para operaciones CRUD de favoritos
router.get('/favorites', authorizationMiddleware, favoriteController.getFavorites);
router.post('/favorites', authorizationMiddleware, favoriteController.createFavorite);
router.delete('/favorites/:movieId', authorizationMiddleware, favoriteController.deleteFavorite);


export default router;
