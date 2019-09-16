const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/registration.ts');

exports.local = passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
