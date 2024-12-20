import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  capital: { type: String, required: true },
  borders: [String],
  area: Number,
  population: Number,
  gini: Number,
  timezones: [String],
  creator: { type: String, required: true },
  category: { type: String, default: 'country', immutable: true }, // Categoría fija
  createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-18' }); // Misma colección

export default mongoose.model('Country', countrySchema);
