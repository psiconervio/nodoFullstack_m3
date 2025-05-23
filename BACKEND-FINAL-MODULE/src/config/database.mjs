import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error conectando a MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log(`MongoDB conectado: ${conn.connection.host}`);
//     } catch (error) {
//          console.log('Error conectando a MongoDB:', error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;