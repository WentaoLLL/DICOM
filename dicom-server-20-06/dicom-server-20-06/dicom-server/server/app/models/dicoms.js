var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    // 父级id
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: String
});

var dicomsModle = mongoose.model('dicoms', personSchema, 'dicoms')

module.exports = dicomsModle