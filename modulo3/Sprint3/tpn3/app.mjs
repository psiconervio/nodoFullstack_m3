import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superheroRoutes.mjs';
import { validarCamposSuperHeroe } from "./middleware/validarNombreSuperHeroe.mjs";
import ejs from 'ejs';

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware para parsear JSON
app.use(express.json());
//ejs
app.set('view engine','ejs');

app.get('/', function(req, res){
  res.render("dashboard");
})
// Conexión a MongoDB
connectDB();

try {
//configuración de rutas atraves de la subruta /api 
//configuracion de capa de rutas de apis, le pasamos rutas definidas
app.use('/api', superHeroRoutes);
//RUTA GLOBAL CON MIDDLEWARE
// app.use('/api',validarCamposSuperHeroe, superHeroRoutes);
console.log('se ejecuto')

} catch (error) {
  // Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

}

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});