import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,obtenerSuperheroesMayoresDe30Nativo, } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res) {
  const { id } = req.params;
  const superheroe = await obtenerSuperheroePorId(id);

  if (superheroe) {
    res.send(renderizarSuperheroe(superheroe));
  } else {
    res.status(404).send({ mensaje: "Superhéroe no encontrado" });
  }
}

export async function obtenerTodosLosSuperheroesController(req, res) {
  const superheroes = await obtenerTodosLosSuperheroes();
  res.send(renderizarListaSuperheroes(superheroes));
}

export async function buscarSuperheroesPorAtributoController(req, res) {
  const { atributo, valor } = req.params;
  const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

  if (superheroes.length > 0) {
    res.send(renderizarListaSuperheroes(superheroes));
  } else {
    res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
  }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
  const superheroes = await obtenerSuperheroesMayoresDe30();
  res.send(renderizarListaSuperheroes(superheroes));
}
//NUEVO CONTROLADOR PARA UN ENDPOINT PARA TRAER MAYORES DE 30 NATIVO

//obtenerSuperheroesMayoresDe30NativoController()
// es una funcion asincrona que ejecuta obtenerSuperheroesMayoresDe30Nativo()
export async function obtenerSuperheroesMayoresDe30NativoController(req, res) {
//La solicitud HTTP entrante, //res: La respuesta HTTP que se enviara al cliente

//obtenerSuperheroesMayoresDe30Nativo() servicio
  const superheroes = await obtenerSuperheroesMayoresDe30Nativo();
//guarda el resultado en una constante, la pasa a una funcion que renderiza
// una lista de los superheroes y la devuelve
  res.send(renderizarListaSuperheroes(superheroes));
}

// Controlador para crear un nuevo superhéroe
export const crearHeroeController = async (req, res) => {
  try { // Captura los datos enviados
    const superHeroData = req.body; 
     //Llama al método del repositorio para crear
    const newSuperHero = await superHeroRepository.crear(superHeroData);
    // Renderiza el superhéroe
    const response = renderizarSuperheroe(newSuperHero);
    // Devuelve el superhéroe creado
    res.status(201).json(response); 
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja errores
  }
};

export const actualizarHeroePorNombre = async (req, res) => {
  try {
    const { nombreSuperHeroe } = req.params; // Obtiene el nombre del superhéroe desde los parámetros de la URL
    const updateData = req.body; // Datos nuevos enviados en el cuerpo de la solicitud

    const updatedSuperHero = await superHeroRepository.actualizarPorNombre(nombreSuperHeroe, updateData); // Llama al repositorio

    if (!updatedSuperHero) {
      return res.status(404).json({ message: 'Superhéroe no encontrado' });
    }

    const response = renderizarSuperheroe(updatedSuperHero); // Renderiza el superhéroe actualizado
    res.status(200).json(response); // Devuelve el superhéroe actualizado
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Controlador para eliminar un superhéroe por ID
export const borrarHeroePorId = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID del superhéroe desde los parámetros de la URL
    const deletedSuperHero = await superHeroRepository.eliminarPorId(id); // Llama al repositorio para eliminar

    if (!deletedSuperHero) {
      return res.status(404).json({ message: 'Superhéroe no encontrado' });
    }

    const response = renderizarSuperheroe(deletedSuperHero); // Renderiza el superhéroe eliminado
    res.status(200).json(response); // Devuelve el superhéroe eliminado
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejo de errores
  }
};
export const borrarHeroePorNombre = async (req, res) => {
  try {
    const { nombre } = req.params; // Obtiene el nombre del superhéroe desde los parámetros de la URL
    const deletedSuperHero = await superHeroRepository.eliminarPorNombre(nombre); // Llama al repositorio para eliminar

    if (!deletedSuperHero) {
      return res.status(404).json({ message: 'Superhéroe no encontrado' });
    }

    const response = renderizarSuperheroe(deletedSuperHero); // Renderiza el superhéroe eliminado
    res.status(200).json(response); // Devuelve el superhéroe eliminado
  } catch (error) {
    res.status(500).json({ message: error.message }); // Manejo de errores
  }
};