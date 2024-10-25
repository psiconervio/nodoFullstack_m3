import express from 'express';

//crear una instancia de expres
const app = express();
//configurar el puerto en el que el servidor escuchara
const PORT =3000;

//ruta basica
// app.get('/',(req,res)=>{
//     res.send('hola mundo')
// })

//solicitud http:localhost:3000
app.get('/',(req,res)=>{
    res.send('pagina inicio')
})

//ruta get para recibir datos simples solicitud a localhost:3000/data
app.get('/data',(req,res)=>{
    res.send('datos recibidos')
})


// Ruta GET con parámetro de ruta
// Solicitud: http://localhost:3000/user/123
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Perfil del usuario con ID: ${userId}`);
});

// Ruta GET con múltiples parámetros
// Solicitud: http://localhost:3000/product/electronics/456
app.get('/product/:category/:id', (req, res) => {
    const { category, id } = req.params;
    res.send(`Categoría: ${category}, ID del producto: ${id}`);
});

// Ruta GET con parámetro de consulta
// Solicitud: http://localhost:3000/search?q=javascript
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`Resultados de búsqueda para: ${query}`);
});

// Ruta GET con múltiples parámetros de consulta
// Solicitud: http://localhost:3000/filter?type=book&minPrice=10&maxPrice=50
app.get('/filter', (req, res) => {
    const { type, minPrice, maxPrice } = req.query;
    res.send(`Filtrar por tipo: ${type}, rango de precios: ${minPrice} - ${maxPrice}`);
});

app.listen(PORT,()=>{
    console.log(`servidor corriendo el el puerto http:/localhost:${PORT}`)
})