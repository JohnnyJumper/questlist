const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    name: String,
    picture: String,
    googleID: String,
    gender: String,
});

module.exports = mongoose.model('users', userSchema);