const usersModle = require('../models/user');

module.exports = {
    query: async (emial, password) => {

        const data = await usersModle.find({ emial, password }).exec();

        return data
    },
    register: (emial, password) => {
        const query = {
            name: '',
            age: '',
            phone: '',
            roles: 'patient',
            emial,
            password,
        }
        return new Promise(function (resolve, reject) {
            usersModle.create({ ...query }, function (err, data) {
                if (err) {
                    resolve({
                        code: 1,
                    })
                } else {
                    resolve({
                        code: 0,
                        data: data || []
                    })
                }
            })
        })
    },
    password: async (id, original_password, password) => {
        const res = await usersModle.findById(id).exec();
        // 判断原密码是否正确
        if (res.password === original_password) {
            const data = await usersModle.findByIdAndUpdate(id, { password }).exec()
            return {
                code: 0,
                msg: 'ok',
                data
            }
        } else {
            return {
                code: 1,
                msg: '原密码不正确！',
                data: null
            }
        }

    },
}