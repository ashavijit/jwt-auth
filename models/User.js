const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lname:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date:{
        type: Date,
        default: Date.now(),
    } // Date.now() is a function that returns the current date and time
})  

module.exports = mongoose.model('User', UserSchema);