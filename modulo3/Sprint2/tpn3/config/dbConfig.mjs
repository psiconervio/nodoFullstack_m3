import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export async function connectDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://Grupo-18:grupo18@cursadanodejs.ls9ii.mongodb.net/', {

      });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
}