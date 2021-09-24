const testImagesModle = require('../models/testImages');

module.exports = {

    query: async () => {
        // 查找
        const data = await testImagesModle.find({}).exec();

        return data
    },

    queryDetail: async (id) => {
        // 查找
        const data = await testImagesModle.findById(id).exec();

        return data
    },

    create: (cover_url, title) => {
        return new Promise(async function (resolve, reject) {
            // 查询数据是否存在
            const data = testImagesModle.find({ cover_url, title }).exec();

            if (data) {
                resolve('数据已存在！')
            } else {
                testImagesModle.create({ cover_url, title }, function (err, data) {
                    if (err) {
                        resolve('添加数据库失败！')
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