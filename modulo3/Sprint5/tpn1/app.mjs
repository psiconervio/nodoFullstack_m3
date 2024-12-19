import express from "express";
import bodyParser from "body-parser";
import { AbortController } from "node-abort-controller";
import path from "path";
import { connectDB } from "./config/dbConfig.mjs";
import methodOverride from "method-override";
import superHeroRoutes from "./routes/superheroRoutes.mjs";
import {
  obtenerSuperheroePorIdController,
} from "./controllers/superheroesController.mjs";
import expressLayouts from "express-ejs-layouts";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;
// Obtener __dirname en un módulo ESM
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Middleware para servir archivos estáticos
app.use(express.static(path.resolve("./public")));

// Conexión a MongoDB
connectDB();
// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.set("views", path.resolve("./views"));

// Configurar express-ejs-layouts
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true })); // Formularios
app.use(express.json()); // JSON adicional

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.path);
  next();
});
// Endpoint para obtener los datos transformados
// Endpoint para obtener los datos transformados
app.get('/countries', async (req, res) => {
  const controller = new AbortController(); // Crear un AbortController
  const timeout = setTimeout(() => controller.abort(), 20000); // Configurar tiempo máximo de espera

  try {
    // Realizar solicitud a la API externa con AbortController
    const response = await axios.get('https://restcountries.com/v3.1/all', {
      signal: controller.signal,
    });

    const countries = response.data;

    // Transformar los datos al formato deseado
    const transformedCountries = countries.map((country) => ({
      _id: {
        $oid: generateObjectId(),
      },
      name: {
        common: country.name.common,
        official: country.name.official,
        nativeName: country.name.nativeName,
      },
      independent: country.independent,
      status: country.status,
      unMember: country.unMember,
      currencies: country.currencies,
      capital: country.capital,
      region: country.region,
      subregion: country.subregion || null,
      languages: country.languages,
      latlng: country.latlng,
      landlocked: country.landlocked,
      borders: country.borders || [],
      area: country.area,
      flag: country.flag,
      maps: country.maps,
      population: country.population,
      gini: country.gini || null,
      fifa: country.fifa || null,
      timezones: country.timezones,
      continents: country.continents,
      flags: {
        png: country.flags.png,
        svg: country.flags.svg,
        alt: country.flags.alt || '',
      },
      startOfWeek: country.startOfWeek,
      capitalInfo: country.capitalInfo,
      creador: 'Martin',
      __v: 0,
    }));

    clearTimeout(timeout); // Limpiar el timeout si la solicitud fue exitosa
    res.json(transformedCountries);
  } catch (error) {
    clearTimeout(timeout); // Limpiar el timeout en caso de error

    if (error.name === 'AbortError') {
      res.status(408).json({ error: 'La solicitud se canceló por tiempo de espera.' });
    } else {
      console.error('Error al obtener los datos:', error.message);
      res.status(500).json({ error: 'Error al obtener los datos.' });
    }
  }
});

// Función para generar un ObjectId simulado
function generateObjectId() {
  return Math.floor(Date.now() / 1000).toString(16) + '0000000000000000';
}

// app.get("/", async (req, res) => {
//   // Crear un AbortController
//   const controller = new AbortController();
//   const timeout = setTimeout(() => {
//     controller.abort(); // Abortar la solicitud después de 5 segundos
//   }, 15000); // Tiempo en milisegundos
//   try {
//     // Hacer la solicitud con AbortController
//     const response = await fetch("https://restcountries.com/v3.1/all", {
//       signal: controller.signal,
//     });
//     // Limpiar el timeout si la solicitud fue exitosa
//     clearTimeout(timeout);
//     // Verificar si la respuesta es válida
//     if (!response.ok) {
//       throw new Error("Error al obtener datos de la API restcountries");
//     }
//     // Parsear la respuesta como JSON
//     const countries = await response.json();
//     // Filtrar países con idioma español
//     const spanishSpeakingCountries = countries.filter((country) => 
//       country.languages && Object.values(country.languages).includes("Spanish")
//     );
//     // Seleccionar 5 datos relevantes
//     const selectedData = spanishSpeakingCountries.map((country) => ({
//       id: country.cca3, // Usar `cca3` como ID único
//       name: country.name.common,
//       region: country.region,
//       population: country.population,
//       capital: country.capital ? country.capital[0] : "N/A",
//       area: country.area,
//     }));
//     // Enviar los datos al cliente
//     // res.json(selectedData);
//     res.json(countries);
//   } catch (error) {
//     // Limpiar el timeout en caso de error
//     clearTimeout(timeout);
//     // Manejar errores específicos de AbortController
//     if (error.name === "AbortError") {
//       console.error("Error: La solicitud fue abortada debido al tiempo de espera");
//       res.status(408).send("La solicitud tardó demasiado en responder"); // Código 408: Request Timeout
//     } else {
//       console.error("Error al cargar los datos:", error.message);
//       res.status(500).send("Error al cargar los datos");
//     }
//   }
// });





// app.get("/", async (req, res) => {
//   try {
//     // obtener los heroes desde la API
//     // const response = await fetch('http://127.0.0.1:3000/api/heroes');
//     const response = await fetch(
//       "https://restcountries.com/v3.1/all"
//     );
//     if (!response.ok) {
//       throw new Error("Error al obtener superhéroes");
//     }
//     const superheroes = await response.json();
//     console.log("Datos obtenidos:", superheroes.slice(0, 5)); // Muestra solo los primeros 5
//     // renderizar la vista del dashboard
//     res.render("index", { superheroes: superheroes.slice(0, 5) });
//   } catch (error) {
//     console.error("Error al cargar el dashboard:", error.message);
//     res.status(500).send("Error al cargar el dashboard");
//   }
// });

// Ruta para agregar superhéroes
app.get("/addSuperhero", (req, res) => {
  res.render("addSuperhero", {
    title: "Agregar Superhéroe",
  });
});

// Ruta para editar superhéroes
app.get(
  "/editSuperhero/id/:id",
  obtenerSuperheroePorIdController,
  (req, res) => {
    const superheroe = req.superheroe; // Obtenido desde el middleware
    console.log(superheroe);
    if (superheroe) {
      res.render("editSuperHero", {
        superheroe, // Envía el superhéroe como 'superhero'
      });
    } else {
      res.status(404).send({ mensaje: "Superhéroe no encontrado" });
    }
  }
);


// Rutas para la API
app.use("/api", superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// import express from 'express';
// import path from "path";
// import { connectDB } from './config/dbConfig.mjs';
// import  methodOverride  from "method-override";
// import superHeroRoutes from './routes/superheroRoutes.mjs';
// import { obtenerSuperheroePorIdController, obtenerTodosLosSuperheroesController } from "./controllers/superheroesController.mjs";
// import expressLayouts from "express-ejs-layouts";
// import { body } from 'express-validator';

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(express.urlencoded({ extended: true }));
// // usar method-override para soportar métodos PUT y DELETE
// app.use(methodOverride('_method'));
// // middleware para parsear JSON
// app.use(express.json());
// // configuracion de EJS
// app.set('view engine', 'ejs');
// app.set('views', path.resolve('./views/partials'));
// //configurar express-ejs-layouts
// app.use(expressLayouts)
// app.set('layout','partials/layout') //archivo base loyout
// //servir archivos estatitcos
// app.use(express.static(path.resolve('./views')))

// app.get('/', async (req, res) => {
//   try {
//     // obtener los superhéroes desde la API
//     const response = await fetch('http://127.0.0.1:3000/api/heroes');
//     if (!response.ok) {
//       throw new Error('Error al obtener superhéroes');
//     }
//     const superheroes = await response.json();
//     // console.log('heroes enviados a la vista:', superheroes);

//     // renderiza la vista del dashboard
//     res.render('index',{
//       title: 'pagina principal',
//       navbarLinks: [{text:'Inicio', href:'/', icon: 'icons/home.svg'},
//         {text:'Acerca de ', href:'/about', icon: 'icons/info.svg'},
//         {text:'Contacto', href:'/contact', icon: 'icons/contact.svg'}

//       ],superheroes
//     });
//   } catch (error) {
//     console.error('Error al cargar el dashboard:', error.message);
//     res.status(500).send('Error al cargar el dashboard');
//   }
// });
// //enpoint actualizado vistas
// app.get('/editSuperhero/:id', obtenerSuperheroePorIdController, (req, res) => {
//   const superheroe = req.superheroe; // Obtenido desde el middleware

//   if (superheroe) {
//     console.log(superheroe);
//     res.render('editSuperhero', { superhero: superheroe }); // Envía el superhéroe como 'superhero'
//   } else {
//     res.status(404).send({ mensaje: "Superhéroe no encontrado" });
//   }
// });

// // vista para agregar superhéroes
// app.get('/addSuperhero', async(req, res) => {
//   //renderiza la vista
//     res.render('addSuperhero');
//   });

// // Conexión a MongoDB
// connectDB();

// // Rutas para la API
// app.use('/api', superHeroRoutes);

// // Manejo de errores para rutas no encontradas
// app.use((req, res) => {
//   res.status(404).send({ mensaje: "Ruta no encontrada" });
// });

// // Inicialización del servidor
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });
///CODIGOS DESACTUALIZADOS

// app.get('/editSuperhero/:id', async (req, res) => {
//   const id = req.params.id;

//   try {
//     const superhero = await obtenerSuperheroePorId(id); // Llama a la función o servicio que obtiene el superhéroe
//     console.log('Superhéroe cargado desde la base de datos:', superhero); // Imprime el objeto recuperado

//     if (superhero) {
//       res.render('editSuperhero', { superhero }); // Envia el superhéroe a la vista
//     } else {
//       console.log(`Superhéroe con ID ${id} no encontrado.`);
//       res.status(404).render('editSuperhero', { superhero: null }); // Renderiza con superhero = null
//     }
//   } catch (error) {
//     console.error('Error al obtener el superhéroe:', error);
//     res.status(500).send('Error interno del servidor');
//   }
// });
//
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
//
// Ruta para renderizar la vista de edición
// app.get('/editSuperhero/:id', async (req, res) => {
//   try {
//     // Llamamos al controlador pasándole `req` y `res` directamente
//     await obtenerSuperheroePorIdController(req);

//     // Nota: Si `obtenerSuperheroePorIdController` envía la respuesta,
//     // este bloque adicional no se ejecutará.
//   } catch (error) {
//     console.error("Error al procesar la solicitud:", error);
//     res.status(500).send({ mensaje: "Error interno del servidor" });
//   }
// });

////
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
