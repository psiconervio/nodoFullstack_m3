import http from 'http'
// crear un servidor http basico
const server = http.createServer((req, res) => {
    res.statusCode= 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola node!')

});

//configurar el servidor para que escuche enel puerto 3000

server.listen(3000, '127.0.0.1', () => {
    console.log('Server is running on port http://localhost:3000');
});

