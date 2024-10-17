import { leerSuperheroes,agregarSuperheroes } from './utils.mjs';
// Leer y mostrar la lista de superhéroes ordenada
const superheroes = leerSuperheroes('./superheroes.txt');
const agregar =  agregarSuperheroes('./superheroes.txt','./agregarSuperheroes.txt');
console.log('Superhéroes ordenados:');
console.log(agregar);
console.log(superheroes);