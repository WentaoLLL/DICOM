class TestList {
    async getImageList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id = '' } = ctx.query

        const data = await service.testList.query(id);

        if (data) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }
    }

    async edit(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id, describe } = ctx.request.body

        const data = await service.testList.edit(id, describe)

        if (data) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }
    }

    async addList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { name = 'confusion_matrix.png' } = ctx.query

        const url = '/testimagelist/exp_yolov5m_1024_batch10_epoch60/' + name;
        const describe = '';
        const parent_id = '60d9269d6cad5013980519ec' // 父级ID

        const data = await service.testList.create({url, describe, parent_id});

        if (data.code === 200) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, data);
        }
    }
}

module.exports = TestList