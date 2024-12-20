import {
  obtenerTodosLosPaises,
  obtenerPaisPorId,
  crearPais,
  actualizarPais,
  eliminarPais,
} from '../services/CountryService.mjs';

export async function obtenerTodosLosPaisesController(req, res) {
  const paises = await obtenerTodosLosPaises();
  res.json(paises);
}

export async function obtenerPaisPorIdController(req, res) {
  const { id } = req.params;
  const pais = await obtenerPaisPorId(id);
  if (!pais) return res.status(404).json({ error: 'País no encontrado' });
  res.json(pais);
}

export async function crearPaisController(req, res) {
  const paisData = req.body;
  const nuevoPais = await crearPais(paisData);
  res.status(201).json(nuevoPais);
}

export async function actualizarPaisController(req, res) {
  const { id } = req.params;
  const paisData = req.body;
  const paisActualizado = await actualizarPais(id, paisData);
  if (!paisActualizado) return res.status(404).json({ error: 'País no encontrado' });
  res.json(paisActualizado);
}

export async function eliminarPaisController(req, res) {
  const { id } = req.params;
  const paisEliminado = await eliminarPais(id);
  if (!paisEliminado) return res.status(404).json({ error: 'País no encontrado' });
  res.json({ message: 'País eliminado exitosamente' });
}
