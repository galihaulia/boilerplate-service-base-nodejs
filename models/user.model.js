const mongoose = require('mongoose');
const { Schema } = mongoose;

// Skema untuk User
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Membuat model User dari skema
const User = mongoose.model('User', userSchema);

module.exports = User;
