import superHeroRepository from '../repositories/SuperHeroRepository.mjs';
import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo,
obtenerSuperheroesMayoresDe30,obtenerSuperheroesMayoresDe30Nativo,createSuperHeroService,borrarHeroePorIdService } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export const actualizarHeroePorId = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body);

    // desesctructuracion y formateo de datos recibidos
    const { poderes, aliados, enemigos, ...rest } = req.body;
    const updateData = {
      ...rest,
      poderes: poderes.split(',').map(p => p.trim()),
      aliados: aliados.split(',').map(a => a.trim()),
      enemigos: enemigos.split(',').map(e => e.trim()),
    };

    // llamada al repositorio para actualizar el heroe
    const updatedHero = await superHeroRepository.actualizarPorId(req.params.id, updateData);

    if (!updatedHero) {
      return res.status(404).send('Héroe no encontrado');
    }

    // Redirige a la lista de heroes o a una página de éxito
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar');
  }
};
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
export async function obtenerTodosLosSuperheroesController(req, res, next) {
  const superheroes = await obtenerTodosLosSuperheroes();
  console.log(superheroes)
  res.send(renderizarListaSuperheroes(superheroes));
  next()
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
export async function obtenerSuperheroesMayoresDe30NativoController(req, res) {

//obtenerSuperheroesMayoresDe30Nativo() servicio
  const superheroes = await obtenerSuperheroesMayoresDe30Nativo();
//guarda el resultado en una constante, la pasa a una funcion que renderiza
// una lista de los superheroes y la devuelve
  res.send(renderizarListaSuperheroes(superheroes));
}
// el controlador le pasa los datos al servicio,
// el servicio ejecuta las funciones repositorio pasandole los datos,
// devuelve esta ejecucion al controlador,
// y el controllador devuelve la respuesta
// controlador para crear un nuevo heroe
export const crearHeroeController = async (req, res) => {
  try {
    const superHeroData = req.body;

    // Llama al servicio para crear el superhéroe
    const newSuperHero = await createSuperHeroService(superHeroData);

    // renderiza el heroe
    const response = renderizarSuperheroe(newSuperHero);

    // Devuelve el héroe creado
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Mejor manejo de errores
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

export const borrarHeroePorId = async (req, res) => {
  try {
    // Obtiene el ID del héroe desde los parámetros de la URL
    const { id } = req.params; 

    // Llama al servicio para eliminar el héroe
    const deletedSuperHero = await borrarHeroePorIdService(id); 

    if (!deletedSuperHero) {
      return res.status(404).json({ message: 'Héroe no encontrado' });
    }

    // Renderiza el heroe eliminado
    const response = renderizarSuperheroe(deletedSuperHero);
    // Devuelve el heroe eliminado
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












// Controlador viejo 
// export const crearHeroeController = async (req, res) => {
//   try { // captura los datos enviados
//     const superHeroData = req.body; 
//      //llama al metodo del repositorio para crear
//     const newSuperHero = await superHeroRepository.crear(superHeroData);
//     // renderiza el heroe
//     const response = renderizarSuperheroe(newSuperHero);
//     // devuelve el heroe creado
//     res.status(201).json(response); 
//   } catch (error) {
//     res.status(500).json({ message: error.message }); // manejo de errores
//   }
// };
// export const actualizarHeroePorId = async (req, res) => {
//   try {
//     // obtiene el id del heroe desde los parametros de la url
//     const { id } = req.params;
//     // datos nuevos enviados en el cuerpo de la solicitud
//     const updateData = req.body; 
//     // llama al repositorio y le pasa los parametros
//     const updatedSuperHero = await superHeroRepository.actualizarPorId(id, updateData);

//     if (!updatedSuperHero) {
//       return res.status(404).json({ message: 'heroe no encontrado' });
//     }
//     // renderiza el heroe actualizado
//     const response = renderizarSuperheroe(updatedSuperHero); 
//     // devuelve el heroe actualizado
//     res.status(200).json(response); 
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



//codigos desactualizados
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