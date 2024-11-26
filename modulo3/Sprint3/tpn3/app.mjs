import express from 'express';
import { convertirFormularioAJSON } from "./middleware/midlewareConvertiraJson.mjs"; 
import { connectDB } from './config/dbConfig.mjs';
import  methodOverride  from "method-override";
import superHeroRoutes from './routes/superheroRoutes.mjs';
import ejs from 'ejs';
import { obtenerSuperheroePorIdController } from "./controllers/superheroesController.mjs";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Middleware para parsear JSON
app.use(express.json());
// Usar method-override para soportar métodos PUT y DELETE
// app.use(convertirFormularioAJSON);

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/editSuperhero/:id', obtenerSuperheroePorIdController, (req, res) => {
  const superheroe = req.superheroe; // Obtén el superhéroe desde `req`
  console.log("Superhéroe a renderizar:", superheroe); // Verificar en consola

  if (superheroe) {
    res.render('editSuperhero', { superhero: superheroe });
  } else {
    res.status(404).send({ mensaje: "Superhéroe no encontrado" });
  }
});
//ENPOINT VIEJO
// app.get('/editSuperhero/:id', obtenerSuperheroePorIdController, (req, res) => {
//   const superheroe = req.superheroe; // Obtén el superhéroe desde `req`
//   console.log(superheroe); // Verifica si está mostrando el superhéroe correctamente

//   if (superheroe) {
//     res.render('editSuperhero', { superhero: superheroe });
//   } else {
//     res.status(404).send({ mensaje: "Superhéroe no encontrado" });
//   }
// });

// app.get('/editSuperhero/:id',obtenerSuperheroePorIdController, async (req, res) => {
//   const superheroe = await obtenerSuperheroePorIdController(res);
//   console.log(req);  // Verifica si está mostrando el id correctamente

//   if (superheroe) {
//     res.render('editSuperhero', { superhero: superheroe });
//   } else {
//     res.status(404).send({ mensaje: "Superhéroe no encontrado" });
//   }
// });
// Página para agregar superhéroes
app.get('/addSuperhero', async(req, res) => {
  // try {
        // Obtener los superhéroes desde la API
  //   const response = await fetch('http://127.0.0.1:3000/api/heroes');
  //   if (!response.ok) {
  //     throw new Error('Error al obtener superhéroes');
  //   }
  //   const superheroes = await response.json();
  //   console.log('Superhéroes enviados a la vista:', superheroes);
  // } catch (error) {
  //   console.error(error)
  // }
  res.render('addSuperhero');
});

// Ruta para renderizar la vista de edición
app.get('/editSuperhero/:id', async (req, res) => {
  try {
    // Llamamos al controlador pasándole `req` y `res` directamente
    await obtenerSuperheroePorIdController(req);

    // Nota: Si `obtenerSuperheroePorIdController` envía la respuesta,
    // este bloque adicional no se ejecutará.
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).send({ mensaje: "Error interno del servidor" });
  }
});


// Ruta para el dashboard
app.get('/', async (req, res) => {
  try {
    // Obtener los superhéroes desde la API
    const response = await fetch('http://127.0.0.1:3000/api/heroes');
    if (!response.ok) {
      throw new Error('Error al obtener superhéroes');
    }
    const superheroes = await response.json();
    console.log('Superhéroes enviados a la vista:', superheroes);

    // Renderizar la vista del dashboard
    res.render('dashboard', { superheroes });
  } catch (error) {
    console.error('Error al cargar el dashboard:', error.message);
    res.status(500).send('Error al cargar el dashboard');
  }
});

// Conexión a MongoDB
connectDB();

// Rutas para la API
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Inicialización del servidor
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

// //middleware para parsear JSON
// app.use(express.json());

// // configuración de EJS
// app.set('view engine', 'ejs');
// app.set('views', './views');

// app.get('/addSuperhero', (req, res) => {
//   res.render('addSuperhero', { title: 'Página Principal' }); // Renderiza la vista home.ejs
// });
// // router.post('/api/heroes', crearSuperHeroeController);
// // Ruta para el dashboard
// app.get('/', async (req, res) => {
//   try {
//     // fetch para obtener los heroes desde la API
//     const response = await fetch('http://localhost:3000/api/heroes');
//     if (!response.ok) {
//       throw new Error('Error al obtener superhéroes');
//     }
//     // datos recibidos de la api
//     const superheroes = await response.json(); 
//     console.log('datos enviados a la vista:', superheroes); 

//     // renderiza la vista  dashboard y envia los datos
//     res.render('dashboard', { superheroes });
//   } catch (error) {
//     console.error('Error al cargar el dashboard:', error.message);
//     res.status(500).send('Error al cargar el dashboard');
//   }
// });

// // conexion a mongodb
// connectDB();

// // configuración de rutas a traves de la subruta /api
// app.use('/api', superHeroRoutes);

// // manejo de errores para rutas no encontradas
// app.use((req, res) => {
//   res.status(404).send({ mensaje: "Ruta no encontrada" });
// });

// // inicializacion de el servidor
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });

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