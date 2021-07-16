class DicomList {

    // 创建病例图片组
    // image为组预览文件
    async addList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { user_id, image } = ctx.request.body

        if (!user_id || !image) {
            sendError(ctx, 'User ID oder Bilden nicht gefunden!')
        } else {
            const data = await service.dicomList.add_dicom(user_id, image)
            if (data === 'ok') {
                sendSuccess(ctx, []);
            } else {
                sendError(ctx, data);
            }
        }

    }

    // 创建病例图片库
    async add_dicoms(ctx) {
        const { service, sendSuccess, sendError } = this
        const { parent_id, image } = ctx.request.body

        if (!parent_id || !image) {
            sendError(ctx, 'User ID oder Bilden nicht gefunden!')
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
            sendError(ctx, 'User ID nicht gefunden!');
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
        const { id } = ctx.query

        if (!id) {
            sendError(ctx, 'User ID nicht gefunden!');
        } else {
            const data = await service.dicomList.query(id);

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
            sendError(ctx, 'Datenbank nicht gefunden!');
        }

    }

    // 删除病例图片
    async deletedList(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id } = ctx.request.body

        if (!id) {
            sendError(ctx, 'User ID nicht gefunden!');
        } else {
            const data = await service.dicomList.delete(id);
            if (data) {
                sendSuccess(ctx, data);
            } else {
                sendError(ctx, 'Löschen nicht erfolgreich!');
            }
        }
    }
}

module.exports = DicomList