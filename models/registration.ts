const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
// import { passportLocalMongoose } from 'passport-local-mongoose';

const userSchema = new Schema({
  // username and password will be added by passportlocalmongoose
  firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    /*
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }, */
    city: {
        type: String,
    },
    contactNumber: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: String,
    },
    gender: {
        type: String
    }
});

// passport local mongoose is mongoose plugin which simplifies building username and password login with Passport
userSchema.plugin(passportLocalMongoose);

const newUser = mongoose.model('User', userSchema);
module.exports = newUser;
