// controllers/tareaController.mjs
import { obtenerTareas, obtenerTareaPorId, agregarTarea, actualizarTarea, eliminarTarea } from '../services/tareaService.mjs';
import { renderizarListaTareas, renderizarTarea } from '../views/responseView.mjs';

export function obtenerTodasLasTareas(req, res) {
  const tareas = obtenerTareas();
  res.send(renderizarListaTareas(tareas));
}

export function obtenerTareaPorIdController(req, res) {
  const { id } = req.params;
  const tarea = obtenerTareaPorId(parseInt(id));
  if (tarea) {
    res.send(renderizarTarea(tarea));
  } else {
    res.status(404).send({ mensaje: "Tarea no encontrada" });
  }
}

export function agregarNuevaTarea(req, res) {
  const datos = req.body;
  const nuevaTarea = agregarTarea(datos);
  res.send(nuevaTarea);
}

export function actualizarTareaPorId(req, res) {
  const { id } = req.params;
  const datos = req.body;
  const resultado = actualizarTarea(parseInt(id), datos);
  res.send(resultado ? 'Tarea actualizada' : 'Tarea no encontrada');
}

export function eliminarTareaPorId(req, res) {
  const { id } = req.params;
  const resultado = eliminarTarea(parseInt(id));
  res.send(resultado ? 'Tarea eliminada' : 'Tarea no encontrada');
}