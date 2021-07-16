const dicomModle = require('../models/dicomList');
const dicomsModle = require('../models/dicoms');
const mongoose = require("mongoose");

module.exports = {

    add_dicom: (user_id, image) => {
        return new Promise(function (resolve, reject) {
            dicomModle.create({ user_id, image }, function (err) {
                if (err) {
                    reject('In Datenbank nicht erfolgreich eingeben!')
                } else {
                    resolve('ok')
                }
            })
        })
    },

    add_dicoms: (parent_id, image) => {
        return new Promise(function (resolve, reject) {
            dicomsModle.create({ parent_id, image }, function (err) {
                if (err) {
                    reject('In Datenbank nicht erfolgreich eingeben!')
                } else {
                    resolve('ok')
                }
            })
        })
    },

    get_dicoms: async (id) => {
        try {
            const data = await dicomsModle.find({ parent_id: id }).exec();
            return data
        } catch (error) {
            return []
        }

    },

    query: async (id) => {
        try {
            const data = await dicomModle.aggregate([{
                $lookup: {
                    from: "dicoms",
                    localField: "_id",
                    foreignField: "parent_id",
                    as: "dicoms"
                }
            }, {
                $match: {
                    user_id:mongoose.Types.ObjectId(id)
                }
            }]).exec();
            return data
        } catch (error) {
            return []
        }

    },

    query_all_list: async (page) => {
        const data = await dicomModle.aggregate([{
            $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }
        }]).skip((page - 1) * 10).limit(10).exec();

        const count = await dicomModle.count({}).exec();

        return {
            data: data || [],
            count: count || 0
        }
    },

    delete: async (id) => {
        const data = await dicomModle.findByIdAndRemove(id).exec()
        return data
    }
}