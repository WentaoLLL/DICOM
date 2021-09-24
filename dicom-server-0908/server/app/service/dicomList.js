const dicomModle = require('../models/dicomList');
const dicomsModle = require('../models/dicoms');
const mongoose = require("mongoose");

module.exports = {

    add_dicom: (user_id, image, type, dec, create_time, name) => {
        const query = {
            user_id,
            image,
            type,
            dec,
            create_time,
            examine: 0,
            name
        }
        return new Promise(function (resolve, reject) {
            dicomModle.create(query, function (err, data) {
                if (err) {
                    resolve({
                        code: 400,
                        data: '插入数据库错误！'
                    })
                } else {
                    resolve({
                        code: 200,
                        data
                    })
                }
            })
        })
    },

    add_dicoms: (parent_id, image) => {
        return new Promise(function (resolve, reject) {
            dicomsModle.create({ parent_id, image }, function (err) {
                if (err) {
                    reject('插入数据库错误！')
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

    query: async (id, type) => {
        try {
            if (type) {
                const data = await dicomModle.aggregate([{
                    $lookup: {
                        from: "dicoms",
                        localField: "_id",
                        foreignField: "parent_id",
                        as: "dicoms"
                    }
                }, {
                    $match: {
                        user_id: mongoose.Types.ObjectId(id),
                        examine: 1,
                        type
                    }
                }]).exec();
                return data
            } else {
                const data = await dicomModle.aggregate([{
                    $lookup: {
                        from: "dicoms",
                        localField: "_id",
                        foreignField: "parent_id",
                        as: "dicoms"
                    }
                }, {
                    $match: {
                        user_id: mongoose.Types.ObjectId(id),
                        examine: 1
                    }
                }]).exec();
                return data
            }
        } catch (error) {
            return []
        }

    },

    search_all_list: async (key_word, user_id) => {
        // const data = await dicomModle.aggregate([{
        //     $lookup: {
        //         from: "users",
        //         localField: "user_id",
        //         foreignField: "_id",
        //         as: "user"
        //     }
        // }, {
        //     $match: {
        //         dec: { $regex: reg },
        //         user_id: mongoose.Types.ObjectId(user_id),
        //         examine: 1,
        //     }
        // }]).exec();

        let query = {
            user_id: mongoose.Types.ObjectId(user_id),
            examine: 1,
        };

        let reg = new RegExp(key_word, 'i')

        if (key_word) {
            query["$or"] = [{ dec: { $regex: reg } }, { name: { $regex: reg } }]
        }

        const data = await dicomModle.find(query).exec();

        return data || []
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

    check: async (id, examine) => {

        const data = await dicomModle.findByIdAndUpdate(id, { examine }).exec();
        return data
    },

    delete: async (id) => {
        const data = await dicomModle.findByIdAndRemove(id).exec()
        return data
    }
}