const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/blogApp');

var userSchema = new Schema({
    fullName : String,
    username : String,
    password : String,
    email : String
},{timestamps: true});

var userModel = mongoose.Model('users'.userSchema);

module.exports = userModel;