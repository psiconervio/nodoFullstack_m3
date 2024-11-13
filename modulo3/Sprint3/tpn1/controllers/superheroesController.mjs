import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30,obtenerSuperheroesMayoresDe30Nativo } from '../services/superheroesService.mjs';
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

//Crear un nuevo superheroe/agregar

export const crearSuperheroeController = async (req, res) => {
  try {
    const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;

    const nuevoSuperheroe = await crearSuperheroe({
      nombreSuperHeroe,
      nombreReal,
      edad,
      planetaOrigen,
      debilidad,
      poderes,
      aliados,
      enemigos,
    });

    res.status(201).json(nuevoSuperheroe);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el superhéroe' });
  }
};