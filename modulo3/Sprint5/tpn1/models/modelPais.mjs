import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: Object,
  independent: Boolean,
  status: String,
  unMember: Boolean,
  currencies: Object,
  capital: [String],
  region: String,
  subregion: String,
  languages: Object,
  latlng: [Number],
  landlocked: Boolean,
  borders: [String],
  area: Number,
  flag: String,
  maps: Object,
  population: Number,
  gini: Object,
  fifa: String,
  timezones: [String],
  continents: [String],
  flags: Object,
  startOfWeek: String,
  capitalInfo: Object,
  creador: String
}, { collection: 'Grupo-18' });

module.exports = mongoose.model("Country", countrySchema);
