import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';
//la clase SuperHeroRepository esta extendiendo (heredando) de la clase IRepository
class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    const query = { [atributo]: new RegExp(valor, 'i') };
    return await SuperHero.find(query);
  }

  async obtenerMayoresDe30() {
    return await SuperHero.find({
      // edad: { $gt: 20 },
      // planetaOrigen: 'Tierra',
      // poderes: { $size: { $gte: 2 } }
    });
  }

  async obtenerMayoresDe30Nativo() {
// atraves de la clase SuperHero filtra la consulta
    return await SuperHero.find({
  // utiliza la sintaxis nativa de mongodb para realizar la consulta
      edad: { $gt: 30 },

    });
  }
}
/*implementa los metodos definidos en la interfaz
 interactuando directamente con mongodb  para realizar operaciones
con los datos,centraliza estas operaciones en el repositorio 
para mejorar la organización */
export default new SuperHeroRepository();