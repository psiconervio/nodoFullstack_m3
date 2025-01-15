import mongoose from "mongoose";
const countrySchema = new mongoose.Schema(
  {
    name: {
      common: { type: String, required: true },
      official: { type: String, required: true },
      nativeName: {
        type: Map,
        of: {
          official: { type: String, required: true },
          common: { type: String, required: true },
        },
      },
    },
    independent: { type: Boolean, required: true },
    status: { type: String, required: true },
    unMember: { type: Boolean, required: true },
    currencies: {
      type: Map,
      of: {
        name: { type: String, required: true },
        symbol: { type: String, required: true },
      },
    },
    capital: [String],
    region: { type: String, required: true },
    subregion: { type: String, required: true },
    languages: {
      type: Map,
      of: String,
    },
    latlng: [Number],
    landlocked: { type: Boolean, required: true },
    borders: [String],
    area: { type: Number, required: true },
    flag: { type: String, required: true },
    maps: {
      googleMaps: { type: String, required: true },
      openStreetMaps: { type: String, required: true },
    },
    population: { type: Number, required: true },
    gini: {
      type: Map,
      of: Number,
    },
    fifa: { type: String },
    timezones: [String],
    continents: [String],
    flags: {
      png: { type: String, required: true },
      svg: { type: String, required: true },
      alt: { type: String },
    },
    startOfWeek: { type: String, required: true },
    capitalInfo: {
      latlng: [Number],
    },
    creator: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Grupo-18" }
);

export default mongoose.model("Country", countrySchema);
//MODELO VIEJO STANDARD
// const countrySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, // Nombre del país
//     capital: { type: String, required: true }, // Capital del país
//     borders: [String], // Fronteras con otros países (array de strings)
//     area: Number, // Área en km²
//     population: Number, // Población
//     gini: Number, // Índice Gini
//     timezones: [String], // Zonas horarias (array de strings)
//     creator: { type: String, required: true }, // Usuario que creó el registro
//     category: { type: String, default: 'country', immutable: true }, // Categoría fija
//     createdAt: { type: Date, default: Date.now }, // Fecha de creación
//   },
//   { collection: 'Grupo-18' } // Usa la misma colección
// );

// export default mongoose.model('Country', countrySchema);
// import mongoose from 'mongoose';

// const countrySchema = new mongoose.Schema({
//   name: { type: String, required: true }, // Nombre del país
//   capital: { type: String, required: true }, // Capital del país
//   area: { type: Number, required: true }, // Área en km²
//   population: { type: Number, required: true }, // Población
//   createdAt: { type: Date, default: Date.now }, // Fecha de creación
// }, { collection: 'countries' });

// export default mongoose.model('Country', countrySchema);

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
