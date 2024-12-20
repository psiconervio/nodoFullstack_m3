import express from 'express';
import {
  obtenerTodosLosPaisesController,
  obtenerPaisPorIdController,
  crearPaisController,
  actualizarPaisController,
  eliminarPaisController,
} from '../controllers/CountryController.mjs';

const router = express.Router();

// Endpoints
router.get('/countries', obtenerTodosLosPaisesController); // Obtener todos los países
router.get('/countries/:id', obtenerPaisPorIdController); // Obtener un país por ID
router.post('/countries', crearPaisController); // Crear un nuevo país
router.put('/countries/:id', actualizarPaisController); // Actualizar un país
router.delete('/countries/:id', eliminarPaisController); // Eliminar un país

export default router;
