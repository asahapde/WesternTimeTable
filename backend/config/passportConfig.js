const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
require('../models/User');
require('dotenv/config');

let User = mongoose.model("user");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (error, user) => {
                    if (error) return done(error);
                    else if (!user) return done(null, false, { message: 'Email is not registered.' });
                    else if (!user.checkPassword(password)) return done(null, false, { message: 'Password is wrong.' });
                    else if (!user.verified) return done(null, false, { message: `Account is not verified. Visit: http://localhost:3000/api/open/verify-user/${user._id} to verify your account!` });
                    else if (!user.activated) return done(null, false, { message: 'Account is deactivated. Contact the administrator at asahapde@uwo.ca.' });
                    else return done(null, user);
                });
        })
);

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/open/google/callback"
    },
        function (accessToken, refreshToken, profile, cb) {
            User.findOne({ username: profile.displayName }, function (err, user) {
                if (user) {
                    cb(null, user);
                } else {
                    new User({
                        email: profile.emails[0].value,
                        username: profile.displayName,
                        name: profile.displayName,
                        verified: true
                    }).save().then((newUser) => {
                        cb(null, newUser);
                    })
                }
            });
        }
    )
);



