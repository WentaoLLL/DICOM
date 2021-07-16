const letterModle = require('../models/letter');
const dayjs = require('dayjs')

module.exports = {
    query: async (login_user_id, user_id) => {
        // 查找发送指定人的
        const data = await letterModle.find({ login_user_id, user_id }).exec();
        // 接受指定人发的
        const res = await letterModle.find({ login_user_id: user_id, user_id: login_user_id }).exec();

        const sortNumber = (a,b)=>{
            return dayjs(a.time).unix() - dayjs(b.time).unix()
        }
        
        return [...res, ...data].sort(sortNumber)
    },

    create: (req) => {
        const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        return new Promise(async function (resolve, reject) {
            letterModle.create({ ...req, time }, function (err, data) {
                if (err) {
                    resolve('In Datenbank nicht erfolgreich eingeben!')
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