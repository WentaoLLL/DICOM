const testListModle = require('../models/testList');

module.exports = {

    query: async (id) => {
        // 查找
        const data = await testListModle.find({ parent_id: id }).exec();

        return data
    },
    
    edit:async(id,describe)=>{
        const data = await testListModle.findByIdAndUpdate(id,{describe}).exec();

        return data

    },

    create: (req) => {
        return new Promise(async function (resolve, reject) {
            testListModle.create({ ...req }, function (err, data) {
                if (err) {
                    resolve('添加数据库失败！')
                } else {
                    resolve({
                        code: 200,
                        ...data
                    })
                }
            })

        })
    },
}