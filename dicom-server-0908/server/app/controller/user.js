class User {

    // 获取用户列表
    async userList(ctx) {
        const { service, sendTableSuccess, sendError } = this
        const { page = 1, key_word = '' } = ctx.query

        const data = await service.user.query(key_word, page);

        if (data) {
            sendTableSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }
    }

    // 获取全部患者信息
    async patientList(ctx) {
        const { service, sendTableSuccess, sendError } = this
        const { name = '' } = ctx.query

        const data = await service.user.queryPatientList(name);

        if (data) {
            sendTableSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }
    }

    // 获取用户信息
    async queryUserInfoasync(ctx) {
        const { service, sendTableSuccess, sendError } = this
        const { id } = ctx.query

        const data = await service.user.queryUserInfoasync(id);

        if (data) {
            sendTableSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }
    }

    // 获取全部用户列表
    async allUserList(ctx) {
        const { service, sendSuccess, sendError } = this

        const data = await service.user.queryAll();

        if (data) {
            sendSuccess(ctx, data);
        } else {
            sendError(ctx, '查找数据库失败！');
        }
    }

    // 创建用户
    async addUser(ctx) {
        const { service, sendSuccess, sendError } = this
        const { name, age, phone, emial, roles, password, adresse } = ctx.request.body

        if (!name) {
            sendError(ctx, '姓名不存在！');
        } else if (!roles) {
            sendError(ctx, '角色不存在！');
        } else {
            const data = await service.user.create({ name, age, phone, emial, roles, password, adresse });

            if (data.code === 200) {
                sendSuccess(ctx, data);
            } else {
                sendError(ctx, data);
            }
        }
    }

    //更新用户
    async updateUser(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id, name, age, phone, emial, roles, password, adresse } = ctx.request.body

        if (!id) {
            sendError(ctx, 'id不存在！');
        } else {
            const data = await service.user.update(id, { name, age, phone, emial, roles, password, adresse });

            if (data.code === 200) {
                sendSuccess(ctx, data.data);
            } else {
                sendError(ctx, data.msg);
            }
        }
    }

    // 更新用户角色
    async updateUserRoles(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id, roles } = ctx.request.body

        if (!id) {
            sendError(ctx, 'id不存在！');
        } else {
            const data = await service.user.updateRoles(id, roles);

            if (data.code === 200) {
                sendSuccess(ctx, data.data);
            } else {
                sendError(ctx, data.msg);
            }
        }
    }

    // 删除用户
    async deleteUser(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id } = ctx.request.body

        if (!id) {
            sendError(ctx, 'id不存在！');
        } else {
            const data = await service.user.delete(id);
            if (data) {
                sendSuccess(ctx, data);
            } else {
                sendError(ctx, '删除失败！');
            }
        }
    }
}

module.exports = User