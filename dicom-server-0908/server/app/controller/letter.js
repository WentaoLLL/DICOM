class User {

    // 获取指定用户的聊天记录
    // id值当前登录用户的id，userId为选择聊天的用户
    async letterList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { login_user_id = '', user_id = '' } = ctx.query

        const data = await service.letter.query(login_user_id, user_id);

        if (data) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }
    }

    // 创建用户的聊天记录
    async addLetterList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { login_user_id, user_id, content } = ctx.request.body

        const data = await service.letter.create({ login_user_id, user_id, content });

        if (data.code === 200) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, data);
        }
    }

}

module.exports = User