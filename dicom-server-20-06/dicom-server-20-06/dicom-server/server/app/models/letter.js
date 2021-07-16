var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    content: String,
    time: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    login_user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

var letterModle = mongoose.model('letter', personSchema, 'letter')

module.exports = letterModle