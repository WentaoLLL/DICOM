var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    cover_url: String,
    title: String,
});

var testImagesModle = mongoose.model('testImages', personSchema, 'testImages')

module.exports = testImagesModle