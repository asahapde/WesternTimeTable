const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('../models/User');

let User = mongoose.model("user");

passport.use(
    new localStrategy({usernameField: 'email'},
    (username, password, done) => {
        User.findOne({email: username},
            (error, user) => {
                if (error) return done(error);
                else if (!user) return done(null, false, {message: 'Email is not registered.'});
                else if (!user.checkPassword(password)) return done(null, false, {message : 'Password is wrong.'});
                else if (!user.verified) return done(null, false, {message: 'Account is not verified.'});
                else if (!user.activated) return done(null, false, {message: 'Account is deactivated. Contact the administrator at asahapde@uwo.ca.'});
                else return done(null, user);
            });
    })
);
