// server.mjs
import express from 'express';
import { obtenerSuperheroePorIdController, buscarSuperheroesPorAtributoController,
     obtenerSuperheroesMayoresDe30Controller } from './controllers/superheroesController.mjs';

const app = express();
const PORT = 3000;

// Rutas
app.get('/',(req,res)=>{
    res.send('pagina inicio')
})
app.get('/', (req,res) => {
    res.send("ruta inicial")
});

app.get('/superheroes/id/:id', obtenerSuperheroePorIdController);
app.get('/superheroes/atributo/:atributo/:valor', buscarSuperheroesPorAtributoController);
app.get('/superheroes/edad/mayorA30', obtenerSuperheroesMayoresDe30Controller);

// Levantar el servidor en el puerto 3005
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto https:/localhost:${PORT}`);
});