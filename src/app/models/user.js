'use strict';
/** Import Modules */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Create Schema with general login
const userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        email: String,
        password: String,
        id: String,
        token: String
    },
    twitter: {
        email: String,
        password: String,
        id: String,
        token: String
    },
    google: {
        email: String,
        password: String,
        id: String,
        token: String
    }
});

//métodos
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);


