import express from 'express';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  obtenerSuperheroesMayoresDe30NativoController,
  createSuperHeroController,
} from '../controllers/superheroesController.mjs';

const router = express.Router();
//configuracion de subrutas, pasandole controladores que ejecutan funciones envian y reciben datos
//atraves de metodos de el protocolo http
router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
// ruta para el nuevo endpoint
router.get('/heroes/buscar/mayores', obtenerSuperheroesMayoresDe30NativoController);
//rutas NUEVAS SPRINT3
router.post('/heroes', createSuperHeroController );
router.put('/heroes', createSuperHeroController );


export default router;