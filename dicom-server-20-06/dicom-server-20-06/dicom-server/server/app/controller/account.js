class Account {
    // web端登录接口
    async login(ctx) {
        const { service, sendSuccess, sendError } = this
        const { emial, password } = ctx.request.body

        if (!emial || !password) {
            sendError(ctx, 'E-Mail oder Password nicht gefunden!');
        } else {
            const data = await service.account.query(emial, password);

            if (data.length) {
                sendSuccess(ctx, data);
            } else {
                sendError(ctx, 'E-Mail oder Password falsch!');
            }
        }

    }
    // web端注册接口
    async register(ctx) {
        const { service, sendSuccess, sendError } = this
        const { emial, password } = ctx.request.body
        if (!emial || !password) {
            sendError(ctx, 'E-Mail oder Password nicht gefunden!');
        } else {
            // 判断是否存在
            const data = await service.account.query(emial, password);
            if (data.length) {
                sendError(ctx, 'Konto schon existiert!');
            } else {
                const data = await service.account.register(emial, password);
                if (data.code === 0) {
                    sendSuccess(ctx, data.data);
                } else {
                    sendError(ctx, 'Nicht erfolgreich Anmeldung!');
                }

            }
        }
    }
    // web端修改密码
    async password(ctx) {
        const { service, sendSuccess, sendError } = this
        const { id, original_password, password } = ctx.request.body
        if (!original_password || !password) {
            sendError(ctx, 'Password nicht gefunden!');
        } else {
            const data = await service.account.password(id, original_password, password);
            if (data.code === 0) {
                sendSuccess(ctx, data.data);
            } else {
                sendError(ctx, data.msg);
            }
        }
    }
    // 管理端登录
    admin_login(ctx) {
        const { sendSuccess, sendError } = this
        // 设置默认账号密码
        const admin_account = { user_name: 'admin', password: 'admin' };
        const { user_name, password } = ctx.request.body
        // 判断是否提交账号与密码
        if (!user_name || !password) {
            sendError(ctx, 'E-Mail oder Password nicht gefunden!');
        } else {
            if (user_name === admin_account.user_name && password === admin_account.password) {
                sendSuccess(ctx, []);
            } else {
                sendError(ctx, 'E-Mail oder Password falsch!');
            }
        }
    }
}

module.exports = Account