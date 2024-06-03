import express from 'express';
import * as userController from '../controllers/User';

const router = express.Router();

// Rutas para operaciones CRUD de usuario
router.get('/users', userController.getUsers); // Obtener todos los usuarios
router.get('/users/:id', userController.getUserById); // Obtener un usuario por su ID
router.put('/users/:id', userController.updateUser); // Actualizar un usuario existente
router.delete('/users/:id', userController.deleteUser); // Eliminar un usuario por su ID
export default router;
