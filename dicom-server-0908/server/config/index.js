const router = require('koa-router')();
const app = require('../app/router');
const controller = require('../app/controller');
const mongoose = require('mongoose');
const mController = require('./controller');

// 封装路由
class mRouter {
    static get(url, action) {
        return router.get(url, action.bind(new mController()))
    }
    static post(url, action) {
        return router.post(url, action.bind(new mController()))
    }
    static delete(url, action) {
        return router.delete(url, action.bind(new mController()))
    }
    static put(url, action) {
        return router.put(url, action.bind(new mController()))
    }
}

// 全局绑定路由和控制器
const config = {
    router: mRouter,
    controller
};

app(config);

//连接数据库
mongoose.connect('mongodb://localhost:27017/hospitaldb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//监听数据库连接状态
mongoose.connection.once('open', () => {
    console.log('数据库连接成功……')
})

//监听数据库端开状态
mongoose.connection.once('close', () => {
    console.log('数据库断开……')
})

mongoose.set('useFindAndModify', false)


module.exports = router
