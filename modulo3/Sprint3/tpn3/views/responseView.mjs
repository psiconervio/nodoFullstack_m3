
export function renderizarSuperheroe(superheroe) {
    return {
      
      Nombre: superheroe.nombreSuperHeroe,
      NombreReal: superheroe.nombreReal,
      Edad: superheroe.edad,
      PlanetadeOrigen: superheroe.planetaOrigen,
      Debilidad: superheroe.debilidad,
      Poderes: superheroe.poderes,
      Aliados: superheroe.aliados,
      Enemigos: superheroe.enemigos,
      id:superheroe.id
    };
  }
  
  export function renderizarListaSuperheroes(superheroes) {
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
  }