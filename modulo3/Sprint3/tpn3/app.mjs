import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superheroRoutes.mjs';
import { validarCamposSuperHeroe } from "./middleware/validarNombreSuperHeroe.mjs";
import ejs from 'ejs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Ruta para el dashboard
app.get('/dashboard', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/api/heroes');
    if (!response.ok) {
      throw new Error('Error al obtener superhéroes');
    }

    const superheroes = await response.json();
    console.log('Datos enviados a la vista:', superheroes); // Verifica aquí los datos
    res.render('dashboard', { superheroes });
  } catch (error) {
    console.error('Error al cargar el dashboard:', error);
    res.status(500).send('Error al cargar el dashboard');
  }
});


// Conexión a MongoDB
connectDB();

// Configuración de rutas a través de la subruta /api
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// import express from 'express';
// import { connectDB } from './config/dbConfig.mjs';
// import superHeroRoutes from './routes/superheroRoutes.mjs';
// import { validarCamposSuperHeroe } from "./middleware/validarNombreSuperHeroe.mjs";
// import ejs from 'ejs';

// const app = express();
// const PORT = process.env.PORT || 3000;
// // Middleware para parsear JSON
// app.use(express.json());
// //ejs
// app.set('view engine','ejs');
// app.set('views', './views'); // Carpeta donde estarán tus archivos EJS
// // app.get('/', function(req, res){
// //   res.render("dashboard");
// // })
// // Ruta para el dashboard
// app.get('/dashboard', async (req, res) => {
//   try {
//     // Usar fetch para obtener los datos del endpoint
//     const response = await fetch('http://localhost:3000/api/heroes'); // Ajusta la URL según tu configuración
//     if (!response.ok) {
//       throw new Error('Error al obtener los superhéroes');
//     }
//     const superheroes = await response.json(); // Parsear el JSON

//     // Renderizar la vista con los datos obtenidos
//     res.render('dashboard', { superheroes });
//   } catch (error) {
//     console.error('Error al cargar el dashboard:', error);
//     res.status(500).send('Error al cargar el dashboard');
//   }
// });

// app.listen(3000, () => {
//   console.log('Servidor corriendo en http://localhost:3000');
// });
// // Conexión a MongoDB
// connectDB();

// try {
// //configuración de rutas atraves de la subruta /api 
// //configuracion de capa de rutas de apis, le pasamos rutas definidas
// app.use('/api', superHeroRoutes);
// //RUTA GLOBAL CON MIDDLEWARE
// // app.use('/api',validarCamposSuperHeroe, superHeroRoutes);
// console.log('se ejecuto')

// } catch (error) {
//   // Manejo de errores para rutas no encontradas
// app.use((req, res) => {
//   res.status(404).send({ mensaje: "Ruta no encontrada" });
// });

// }

// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en el puerto ${PORT}`);
// });