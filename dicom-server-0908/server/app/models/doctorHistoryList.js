var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
});

var doctorHistoryListModle = mongoose.model('doctorHistoryLists', personSchema, 'doctorHistoryLists')

module.exports = doctorHistoryListModle