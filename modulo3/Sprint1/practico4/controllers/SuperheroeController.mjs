// controllers/superheroesController.mjs
import { 
    obtenerSuperheroes, 
    obtenerSuperheroePorId, 
    agregarSuperheroe, 
    actualizarSuperheroe, 
    eliminarSuperheroe, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30YConFiltros 
  } from '../services/superheroesService.mjs';
  import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';
  
  export function obtenerTodosLosSuperheroes(req, res) {
    const superheroes = obtenerSuperheroes();
    res.send(renderizarListaSuperheroes(superheroes));
  }
  
  export function obtenerSuperheroePorIdController(req, res) {
    const { id } = req.params;
    const superheroe = obtenerSuperheroePorId(parseInt(id));
    if (superheroe) {
      res.send(renderizarSuperheroe(superheroe));
    } else {
      res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
  }
  
  export function agregarNuevoSuperheroe(req, res) {
    const datos = req.body;
    const nuevoSuperheroe = agregarSuperheroe(datos);
    res.send(nuevoSuperheroe);
  }
  
  export function actualizarSuperheroePorId(req, res) {
    const { id } = req.params;
    const datos = req.body;
    const resultado = actualizarSuperheroe(parseInt(id), datos);
    res.send(resultado ? 'Superhéroe actualizado' : 'Superhéroe no encontrado');
  }
  
  export function eliminarSuperheroePorId(req, res) {
    const { id } = req.params;
    const resultado = eliminarSuperheroe(parseInt(id));
    res.send(resultado ? 'Superhéroe eliminado' : 'Superhéroe no encontrado');
  }
  
  export function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    const superheroes = buscarSuperheroesPorAtributo(atributo, valor);
    res.send(renderizarListaSuperheroes(superheroes));
  }
  
  export function obtenerSuperheroesMayoresDe30YConFiltrosController(req, res) {
    const superheroes = obtenerSuperheroesMayoresDe30YConFiltros();
    res.send(renderizarListaSuperheroes(superheroes));
  }