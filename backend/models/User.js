const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, minlength: 4},
    admin: {type: Boolean, default: false},
    activated: {type: Boolean, default: true},
    verified: {type: Boolean, default: false},
})

userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log(error);
    }
});



userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id}, process.env.SECRET, {  expiresIn: "30m"} );
}

module.exports = mongoose.model('user', userSchema, 'users');