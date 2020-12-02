const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
    activated: {type: Boolean, default: false},
    verified: {type: Boolean, default: false},
})

module.exports = mongoose.model('user', userSchema, 'users');