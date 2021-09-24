const service = require('../app/service');
const models = require('../app/models');

class controller {
    constructor() {
        this.service = service;
        this.models = models;
    }

    sendSuccess(ctx, data) {
        ctx.body = {
            code: 200,
            msg: 'ok',
            data
        }
    }

    sendTableSuccess(ctx, data) {
        ctx.body = {
            code: 200,
            msg: 'ok',
            ...data
        }
    }

    sendError(ctx, msg) {
        ctx.body = {
            msg,
            code: 201,
            data: null
        }
    }
}

module.exports = controller