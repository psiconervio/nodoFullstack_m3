import countryRepository from '../repositories/CountryRepository.mjs';
//Los servicios procesan datos, realizan validaciones avanzadas, o coordinan llamadas a los repositories.
//el servicio ejecuta desde la clase countryRepository la funcion obtenerTodos()
export async function obtenerTodosLosPaises() {
  // de la clase countryRepository ejecuta la funcion obtenerTodos()
  return await countryRepository.obtenerTodos();
}

export async function obtenerPaisPorId(id) {
  return await countryRepository.obtenerPorId(id);
}

export async function crearPais(paisData) {
  return await countryRepository.crear(paisData);
}

export async function actualizarPais(id, paisData) {
  return await countryRepository.actualizar(id, paisData);
}

export async function eliminarPais(id) {
  return await countryRepository.eliminar(id);
}
