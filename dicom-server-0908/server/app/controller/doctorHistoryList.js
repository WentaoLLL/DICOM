class DoctorHistoryList {
    // 获取指定医生的处理记录
    async historyList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id } = ctx.query

        if (!id) {
            sendError(ctx, '医生的id不存在!');
        } else {
            const data = await service.doctorHistoryList.query(id);

            if (data) {
                sendSuccess(ctx, data);
            } else {
                sendError(ctx, data.msg);
            }
        }
    }

    // 创建医生的处理记录
    async addDoctorHistoryList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { user_id, doctor_id } = JSON.parse(ctx.request.body)
        
        if (!user_id || !doctor_id) {
            sendError(ctx, '医生的id或者患者的id不存在');
        } else {
            const data = await service.doctorHistoryList.create(user_id, doctor_id);

            if (data.code === 200) {
                sendSuccess(ctx, data);
            } else {
                sendSuccess(ctx, data.msg);
            }
        }

    }
}

module.exports = DoctorHistoryList