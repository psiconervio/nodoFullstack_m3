import express from 'express';
import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';
import { renderizarSuperheroe } from '../views/responseView.mjs';
import { validarCamposSuperHeroe } from '../middleware/validarNombreSuperHeroe.mjs';
import { validarHeroeEvalidator } from '../middleware/validarMidle.mjs';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  obtenerSuperheroesMayoresDe30NativoController,
  crearHeroeController,
  actualizarHeroePorNombre,
  borrarHeroePorId,
  borrarHeroePorNombre
} from '../controllers/superheroesController.mjs';
const router = express.Router();
//configuracion de subrutas, pasandole controladores que ejecutan funciones envian y reciben datos
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
// ruta para el nuevo endpoint
router.get('/heroes/buscar/mayores', obtenerSuperheroesMayoresDe30NativoController);
//rutas NUEVAS ruta post con middleware
router.post('/heroes',validarHeroeEvalidator, crearHeroeController );
// ejercicio 3
router.put('/heroes/nombre/:nombreSuperHeroe',validarHeroeEvalidator, actualizarHeroePorNombre);
// ejercicio 4
router.delete('/heroes/:id', borrarHeroePorId);
// ejercicio 5 Endpoint DELETE para eliminar un superhéroe por nombre
router.delete('/heroes/nombre/:nombre', borrarHeroePorNombre);

router.get('/heroes/nombre/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params; // Obtiene el nombre de los parámetros de la URL
    const superheroe = await SuperHeroRepository.buscarPorNombre(nombre); // Busca por nombre

    if (!superheroe) {
      return res.status(404).json({ error: `No se encontró un superhéroe con el nombre "${nombre}".` });
    }

    // Renderiza el superhéroe y añade el ID
    res.status(200).json({
      id: superheroe._id, // Incluye el ID del superhéroe
      ...renderizarSuperheroe(superheroe)
    });
  } catch (error) {
    console.error('Error al buscar el superhéroe por nombre:', error);
    res.status(500).json({ error: 'Error al buscar el superhéroe.' });
  }
});
export default router;