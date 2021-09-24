class DicomList {

    // 创建病例图片组
    // image为组预览文件
    async addList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { user_id, image, type, dec, create_time,name } = ctx.request.body

        if (!user_id || !image) {
            sendError(ctx, '用户id或者图片不存在！')
        } else {
            const data = await service.dicomList.add_dicom(user_id, image, type, dec, create_time,name)
            if (data.code === 200) {
                sendSuccess(ctx, data.data);
            } else {
                sendError(ctx, data.data);
            }
        }

    }

    // 创建病例图片库
    async add_dicoms(ctx) {
        const { service, sendSuccess, sendError } = this
        const { parent_id, image } = ctx.request.body

        if (!parent_id || !image) {
            sendError(ctx, '组id或者图片不存在！')
        } else {
            const data = await service.dicomList.add_dicoms(parent_id, image)
            if (data === 'ok') {
                sendSuccess(ctx, []);
            } else {
                sendError(ctx, data);
            }
        }

    }

    // 获取指定组的图片库
    async get_dicoms(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id } = ctx.query

        if (!id) {
            sendError(ctx, 'id不存在！');
        } else {
            const data = await service.dicomList.get_dicoms(id);

            if (data) {
                sendSuccess(ctx, data);
            } else {
                sendSuccess(ctx, []);
            }
        }

    }


    // 获取指定用户的病例图片
    async getList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id, type } = ctx.query

        if (!id) {
            sendError(ctx, 'id不存在！');
        } else {
            const data = await service.dicomList.query(id, type);

            if (data) {
                sendSuccess(ctx, data);
            } else {
                sendSuccess(ctx, []);
            }
        }

    }
    // 获取全部的病例图片
    async getAllList(ctx) {
        const { service, sendTableSuccess, sendError } = this
        const { page = 1 } = ctx.query

        const data = await service.dicomList.query_all_list(page);

        if (data) {
            sendTableSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }

    }

    async getSearchAllList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { key_word = "", user_id = "" } = ctx.query

        const data = await service.dicomList.search_all_list(key_word, user_id);

        if (data) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }

    }

    // 控制展示
    async check(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id, examine } = ctx.request.body

        const data = await service.dicomList.check(id, examine);

        if (data) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, data);
        }

    }

    // 删除病例图片
    async deletedList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id } = ctx.request.body

        if (!id) {
            sendError(ctx, 'id不存在！');
        } else {
            const data = await service.dicomList.delete(id);
            if (data) {
                sendSuccess(ctx, data);
            } else {
                sendError(ctx, '删除失败！');
            }
        }
    }
}

module.exports = DicomList