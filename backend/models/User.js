const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    admin: Boolean,
    activated: Boolean,
    verified: Boolean,
})

module.exports = mongoose.model('user', userSchema, 'users');