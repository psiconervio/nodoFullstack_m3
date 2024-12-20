import Country from '../models/Country.mjs';

class CountryRepository {
  async obtenerTodos() {
    return await Country.find({ category: "country" });
  }

  async obtenerPorId(id) {
    return await Country.findById(id);
  }

  async crear(paisData) {
    const nuevoPais = new Country(paisData);
    return await nuevoPais.save();
  }

  async actualizar(id, paisData) {
    return await Country.findByIdAndUpdate(id, paisData, { new: true });
  }

  async eliminar(id) {
    return await Country.findByIdAndDelete(id);
  }
}

export default new CountryRepository();

// import Country from '../models/Country.mjs'; // Asegúrate de tener definido el modelo

// class CountryRepository {
//   // Obtener todos los países
//   async getAllCountries() {
//     try {
//       return await Country.find(); // Busca todos los documentos en la colección
//     } catch (error) {
//       throw new Error(`Error al obtener países: ${error.message}`);
//     }
//   }

//   // Obtener un país por su ID
//   async getCountryById(id) {
//     try {
//       return await Country.findById(id); // Busca un documento por su ID
//     } catch (error) {
//       throw new Error(`Error al obtener el país con ID ${id}: ${error.message}`);
//     }
//   }

//   // Crear un nuevo país
//   async createCountry(countryData) {
//     try {
//       const newCountry = new Country(countryData); // Crear instancia del modelo
//       return await newCountry.save(); // Guardar en la base de datos
//     } catch (error) {
//       throw new Error(`Error al crear país: ${error.message}`);
//     }
//   }

//   // Actualizar un país existente por ID
//   async updateCountry(id, countryData) {
//     try {
//       return await Country.findByIdAndUpdate(id, countryData, { new: true }); // Actualizar documento
//     } catch (error) {
//       throw new Error(`Error al actualizar el país con ID ${id}: ${error.message}`);
//     }
//   }

//   // Eliminar un país por ID
//   async deleteCountry(id) {
//     try {
//       return await Country.findByIdAndDelete(id); // Eliminar documento
//     } catch (error) {
//       throw new Error(`Error al eliminar el país con ID ${id}: ${error.message}`);
//     }
//   }
// }

// export default CountryRepository;
