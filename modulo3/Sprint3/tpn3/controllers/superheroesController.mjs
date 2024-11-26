import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,obtenerSuperheroesMayoresDe30Nativo,actualizarPorIdd } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';


export async function obtenerSuperheroePorIdController(req, res, next) {
  const { id } = req.params;
  try {
    const superheroe = await obtenerSuperheroePorId(id); // Lógica para obtener el superhéroe por ID

    if (superheroe) {
      req.superheroe = renderizarSuperheroe(superheroe); // Adjunta el superhéroe a `req`
      next(); // Pasa al siguiente middleware
    } else {
      res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
  } catch (error) {
    next(error); // Manejo de errores
  }
}
//ENPOINT ORIGINAL
// export async function obtenerSuperheroePorIdController(req, res) {
//   const { id } = req.params;
//   const superheroe = await obtenerSuperheroePorId(id);

//   if (superheroe) {
//     res.send(renderizarSuperheroe(superheroe));
//   } else {
//     res.status(404).send({ mensaje: "Superhéroe no encontrado" });
//   }
// }

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

// controlador para crear un nuevo heroe
export const crearHeroeController = async (req, res) => {
  try { // captura los datos enviados
    const superHeroData = req.body; 
     //llama al metodo del repositorio para crear
    const newSuperHero = await superHeroRepository.crear(superHeroData);
    // renderiza el heroe
    const response = renderizarSuperheroe(newSuperHero);
    // devuelve el heroe creado
    res.status(201).json(response); 
  } catch (error) {
    res.status(500).json({ message: error.message }); // manejo de errores
  }
};

export const actualizarHeroePorNombre = async (req, res) => {
  try {
     // obtiene el nombre del heroe desde los parametros de la url
    const { nombreSuperHeroe } = req.params;
    // datos nuevos enviados en el cuerpo de la solicitud
    const updateData = req.body; 
    // llama al repositorio y le pasa los parametros
    const updatedSuperHero = await superHeroRepository.actualizarPorNombre(nombreSuperHeroe, updateData);

    if (!updatedSuperHero) {
      return res.status(404).json({ message: 'heroe no encontrado' });
    }
    // renderiza el heroe actualizado
    const response = renderizarSuperheroe(updatedSuperHero); 
    // devuelve el heroe actualizado
    res.status(200).json(response); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const actualizarHeroePorId = async (req, res) => {
  try {
    // obtiene el id del heroe desde los parametros de la url
    const { id } = req.params;
    // datos nuevos enviados en el cuerpo de la solicitud
    const updateData = req.body; 
    // llama al repositorio y le pasa los parametros
    const updatedSuperHero = await superHeroRepository.actualizarPorIdd(id, updateData);

    if (!updatedSuperHero) {
      return res.status(404).json({ message: 'heroe no encontrado' });
    }
    // renderiza el heroe actualizado
    const response = renderizarSuperheroe(updatedSuperHero); 
    // devuelve el heroe actualizado
    res.status(200).json(response); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controlador para eliminar un heroe por ID
export const borrarHeroePorId = async (req, res) => {
  try {
    //obtiene el ID del heroe desde los parámetros de la URL
    const { id } = req.params; 
    // Llama al repositorio para eliminar
    const deletedSuperHero = await superHeroRepository.eliminarPorId(id); 

    if (!deletedSuperHero) {
      return res.status(404).json({ message: 'heroe no encontrado' });
    }
 // renderiza el heroe eliminado
    const response = renderizarSuperheroe(deletedSuperHero);
    // devuelve el heroe eliminado
    res.status(200).json(response); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const borrarHeroePorNombre = async (req, res) => {
  try {
    // obtiene el nombre del heroe desde los parámetros de la URL
    const { nombre } = req.params; 
    // lama al repositorio para eliminar
    const deletedSuperHero = await superHeroRepository.eliminarPorNombre(nombre); 

    if (!deletedSuperHero) {
      return res.status(404).json({ message: 'heroe no encontrado' });
    }
    // renderiza el heroe eliminado
    const response = renderizarSuperheroe(deletedSuperHero); 
     // devuelve el heroe eliminado
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};