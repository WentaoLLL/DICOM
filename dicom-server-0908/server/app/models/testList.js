var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    url: String,
    describe:String,
    parent_id:String,
});

var testListModle = mongoose.model('testList', personSchema, 'testList')

module.exports = testListModle