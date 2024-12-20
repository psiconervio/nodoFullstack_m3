import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del país
  capital: { type: String, required: true }, // Capital del país
  area: { type: Number, required: true }, // Área en km²
  population: { type: Number, required: true }, // Población
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
}, { collection: 'countries' });

export default mongoose.model('Country', countrySchema);

// import mongoose from 'mongoose';

// const countrySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   capital: { type: String, required: true },
//   borders: [String],
//   area: Number,
//   population: Number,
//   gini: Number,
//   timezones: [String],
//   creator: { type: String, required: true },
//   category: { type: String, default: 'country', immutable: true }, // Categoría fija
//   createdAt: { type: Date, default: Date.now }
// }, { collection: 'Grupo-18' }); // Misma colección

// export default mongoose.model('Country', countrySchema);
