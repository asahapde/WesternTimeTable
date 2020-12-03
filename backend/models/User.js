const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true, maxlength: 15},
    email: {type: String, required: true},
    password: {type: String, required: true, minlength: 4},
    admin: {type: Boolean, default: false},
    activated: {type: Boolean, default: false},
    verified: {type: Boolean, default: false},
})

userSchema.pre('save', function (next) {
    try {
        const hashedPassword = bcrypt.hash(this.password, 10);
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
    return jwt.sign({ _id: this._id}, "secretcode",{  expiresIn: "5m"} );
}

module.exports = mongoose.model('user', userSchema, 'users');