// models/superheroe.mjs
export default class Superheroe {
  constructor(
    id,
    nombreSuperHeroe,
    nombreReal,
    edad,
    planetaOrigen,
    debilidad,
    poderes = [],
    aliados = [],
    enemigos = []
  ) {
    this.id = id;
    this.nombreSuperHeroe = nombreSuperHeroe;
    this.nombreReal = nombreReal;
    this.edad = edad;
    this.planetaOrigen = planetaOrigen;
    this.debilidad = debilidad;
    this.poderes = poderes;
    this.aliados = aliados;
    this.enemigos = enemigos;
  }

  // Método para agregar un nuevo poder al superhéroe
  agregarPoder(poder) {
    this.poderes.push(poder);
  }

  // Método para agregar un aliado
  agregarAliado(aliado) {
    this.aliados.push(aliado);
  }

  // Método para agregar un enemigo
  agregarEnemigo(enemigo) {
    this.enemigos.push(enemigo);
  }
}
