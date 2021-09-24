var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    image: String,
    type: String,// dcm原图还是ai处理图
    examine: Number,// 审核是否通过，0 否，1 是
    dec: String,
    name: String,
    create_time: String,
});

var dicomModle = mongoose.model('dicomLists', personSchema, 'dicomLists')

module.exports = dicomModle