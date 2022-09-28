module.exports = options => {
    return async function adminauth(ctx, next) {
        if (this.ctx.openId) {
            await next()
        } else {
            ctx.body = { data: '没有登录' }
        }
    }
}