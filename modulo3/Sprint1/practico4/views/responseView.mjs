// views/tareaView.mjs
//funcion para renderizar una lista de tareas en formato JSON
export function renderizarListaTareas(tareas) {
    return JSON.stringify(tareas, null, 2);
  }
//funcion para renderizar un mensaje generico en formato json
  export function renderizarTarea(tarea) {
    return JSON.stringify(tarea, null, 2);
  }
// funcion para renderizar una tarea especifica
export function renderizarTarea(tarea){
  //formatea una tarea individual en formato JSON con indetacion
  return JSON.stringify(tarea, null, 2)
}