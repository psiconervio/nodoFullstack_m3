import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
// const mongoose = require('mongoose');
// const Role = require('./Role');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Role'
//     }
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// module.exports = User;