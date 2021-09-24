class TestImages {
    // 获取测试图片的列表
    async getList(ctx) {
        const { service, sendSuccess, sendError } = this

        const data = await service.testImages.query();

        if (data) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }
    }

    async addList(ctx){
        const { service, sendSuccess, sendError } = this
        
        const cover_url = '/testimagelist/exp_yolov5m_1024_batch10_epoch60/test_batch0_labels.jpg';
        const title = 'exp_yolov5m_1024_batch10_epoch60';
        
        const data = await service.testImages.create(cover_url, title );

        if (data.code === 200) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, data);
        }
    }
}

module.exports = TestImages