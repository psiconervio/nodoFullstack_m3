const superheroSchema = new mongoose.Schema({
  nombreSuperHeroe: { type: String, required: true },
  nombreReal: { type: String, required: true },
  edad: { type: Number, min: 0 },
  planetaOrigen: { type: String, default: 'Desconocido' },
  debilidad: String,
  poderes: [String],
  aliados: [String],
  enemigos: [String],
  createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-18' }); // Aquí defines la colección de cada grupo
  
  
  const SuperHero = mongoose.model('SuperHero', superheroSchema);