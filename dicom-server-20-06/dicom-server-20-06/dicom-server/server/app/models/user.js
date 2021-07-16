var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    age: Number,
    phone: String,
    emial: String,
    roles: String,
    password:String,
});

var usersModle = mongoose.model('users', personSchema, 'users')

module.exports = usersModle