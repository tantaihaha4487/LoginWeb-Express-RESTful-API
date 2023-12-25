const mongoose = require('mongoose');

userSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }


}, { collection: 'user' });

module.exports = mongoose.model('User', userSchema);