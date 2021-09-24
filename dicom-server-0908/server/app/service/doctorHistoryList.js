const doctorHistoryListModle = require('../models/doctorHistoryList');
const mongoose = require("mongoose");

module.exports = {
    query: async (id) => {
        const data = await doctorHistoryListModle.aggregate([{
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        }, {
            $match: {
                doctor_id:mongoose.Types.ObjectId(id)
            }
        }]).exec();

        return data
    },
    create: (user_id, doctor_id) => {
        return new Promise(async function (resolve, reject) {

            const res = await doctorHistoryListModle.find({ user_id, doctor_id }).exec();
            if (res.length) {
                resolve({
                    code: 201,
                    msg: '该记录已存在！'
                })
            } else {
                doctorHistoryListModle.create({ user_id, doctor_id }, function (err, data) {
                    if (err) {
                        resolve({
                            code: 201,
                            msg: '添加数据库失败！'
                        })
                    } else {
                        resolve({
                            code: 200,
                            ...data
                        })
                    }
                })
            }

        })
    },
}