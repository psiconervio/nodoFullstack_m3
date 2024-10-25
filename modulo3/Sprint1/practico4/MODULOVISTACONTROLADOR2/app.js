import express from 'express';

//crear una instancia de expres
const app = express();
//configurar el puerto en el que el servidor escuchara
const PORT =3000;

// ruta basica
app.get('/',(req,res)=>{
    res.send('hola mundo')
})

//iniciar servidor

app.listen(PORT, (req, res)=>{
    console.log(`coriendo en el puerto ${PORT}`)
})