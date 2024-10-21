import { leerSuperheroes,agregarSuperheroes } from './utils.mjs';
// Leer y mostrar la lista de superhéroes ordenada
const agregar =  agregarSuperheroes('./superheroes.txt','./agregarSuperheroes.txt');
const superheroes = leerSuperheroes('./superheroes.txt');

console.log('Superhéroes ordenados:');
console.log(agregar);
console.log(superheroes);