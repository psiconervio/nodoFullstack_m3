import SuperHero from "../models/SuperHero.mjs";
import IRepository from "./IRepository.mjs";
/*implementa los metodos definidos en la interfaz
 interactuando directamente con mongodb  para realizar operaciones
con los datos,centraliza estas operaciones en el repositorio 
para mejorar la organización */
//la clase SuperHeroRepository esta extendiendo (heredando) de la clase IRepository
class SuperHeroRepository extends IRepository {
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }
  //primer paso crear la interaccion con la db y exportar la funcion al irepository
  async actualizarPorId(id, datosActualizados) {
    try {
      // Busca por ID y actualiza con los datos proporcionados
      const heroActualizado = await SuperHero.findByIdAndUpdate(
        id, // ID del héroe a actualizar
        datosActualizados, // Nuevos datos a actualizar
        {
          new: true, // Devuelve el documento actualizado
          runValidators: true, // Aplica validaciones de Mongoose
        }
      );

      if (!heroActualizado) {
        throw new Error('Héroe no encontrado');
      }

      return heroActualizado;
    } catch (error) {
      console.error('Error al actualizar el héroe:', error);
      throw new Error('Error en la actualización del héroe');
    }
  }
  // async actualizarPorId(id, datosActualizados) {
  //   return await SuperHero.findByIdAndUpdate(
  //     // busca por id
  //     id, 
  //     // nuevos datos
  //     datosActualizados,
  //     // opciones: devuelve el documento actualizado y aplica validaciones
  //     { new: true, runValidators: true }
  //   );
  // }
  
  async obtenerTodos() {
    return await SuperHero.find({});
  }

  async buscarPorAtributo(atributo, valor) {
    const query = { [atributo]: new RegExp(valor, "i") };
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

  async buscarPorNombre(nombreSuperHeroe) {
    const query = { nombreSuperHeroe: new RegExp(nombreSuperHeroe, "i") }; // busqueda insensible a mayúsculas/minúsculas
    return await SuperHero.findOne(query); // encuentra el primer superhéroe que coincida
  }

  // crear nuevo superheroe interactuando con la db
  async crear(superheroe) {
    const nuevoSuperheroe = new SuperHero(superheroe); // Crea una instancia del modelo
    return await nuevoSuperheroe.save(); // Guarda el superhéroe en la base de datos
  }

  // actualizar un superhéroe por su nombre
  async actualizarPorNombre(nombreSuperHeroe, datosActualizados) {
    return await SuperHero.findOneAndUpdate(
      // busca por nombre (case-insensitive)
      { nombreSuperHeroe: new RegExp(`^${nombreSuperHeroe}$`, "i") }, 
      // nuevos datos
      datosActualizados,
      //opciones: devuelve el documento actualizado y aplica validaciones
      { new: true, runValidators: true } 
    );
  }

  // metodo para eliminar un superhéroe por ID
  async eliminarPorId(id) {
    return await SuperHero.findByIdAndDelete(id); // Busca por ID y elimina
  }
  
  async eliminarPorNombre(nombreSuperHeroe) {
    // busqueda insensible a mayúsculas/minúsculas
    const query = { nombreSuperHeroe: new RegExp(nombreSuperHeroe, 'i') };
    // encuentra y elimina el superhéroe
    return await SuperHero.findOneAndDelete(query); 
  }
}

export default new SuperHeroRepository();
