const usersModle = require('../models/user');

module.exports = {
    query: async (key_word, page) => {
        let query = {}

        let reg = new RegExp(key_word, 'i');

        if (key_word) {
            query["$or"] = [{ name: { $regex: reg } }, { phone: { $regex: reg } }]
        }

        const data = await usersModle.find(query).skip((page - 1) * 10).limit(10).exec();

        const count = await usersModle.count(query).exec();

        return {
            data: data || [],
            count: count || 0
        }
    },

    queryPatientList: async () => {
        const data = await usersModle.aggregate([{
            $lookup: {
                from: "doctorHistoryLists",
                localField: "_id",
                foreignField: "user_id",
                as: "history"
            }
        }, {
            $match: {
                roles:'patient'
            }
        }]).exec();

        return {
            data
        }
    },

    queryUserInfoasync: async (id) => {

        const data = await usersModle.findOne({_id:id}).exec()

        return {
            data
        }
    },

    queryAll: async () => {

        const data = await usersModle.find({}).exec();

        return data || []
    },

    create: (req) => {
        return new Promise(async function (resolve, reject) {

            const res = await usersModle.findOne({ phone: req.phone }).exec();
            if (res) {
                resolve('User schon exisiert!')
            } else {
                usersModle.create({ ...req }, function (err, data) {
                    if (err) {
                        resolve('In Datenbank nicht erfolgreich eingeben!')
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

    update: async (id, req) => {
        const data = await usersModle.findByIdAndUpdate(id, { ...req }).exec()

        if (data) {
            const res = await usersModle.findById(id).exec();

            return {
                code: 200,
                data: res
            }
        }

    },

    updateRoles: async (id, roles) => {
        const data = await usersModle.findByIdAndUpdate(id, { roles }).exec()

        if (data) {
            const res = await usersModle.findById(id).exec();

            return {
                code: 200,
                data: res
            }
        }

    },

    delete: async (id) => {
        const data = await usersModle.findByIdAndRemove(id).exec()
        return data
    }
}