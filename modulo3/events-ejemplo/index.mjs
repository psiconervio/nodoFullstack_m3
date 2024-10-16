import {EvertEmitter} from 'events';

//crear una instancia de eventemitter
const emisor = new EvertEmitter();

//definir  un evento personalizado

emisor.on('saludo',(nombre)=>{
    console.log(`!hola, ${nombre}!`)
})


//emitir el evento "saludi"

emisor.emit('saludo', 'hola mundo')