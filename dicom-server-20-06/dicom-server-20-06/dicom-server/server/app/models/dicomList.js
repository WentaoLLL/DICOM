var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: String
});

var dicomModle = mongoose.model('dicomLists', personSchema, 'dicomLists')

module.exports = dicomModle