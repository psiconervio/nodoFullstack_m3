import countryRepository from '../repositories/CountryRepository.mjs';

export async function obtenerTodosLosPaises() {
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
