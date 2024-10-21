// views/tareaView.mjs
export function renderizarListaTareas(tareas) {
    return JSON.stringify(tareas, null, 2);
  }
  
  export function renderizarTarea(tarea) {
    return JSON.stringify(tarea, null, 2);
  }