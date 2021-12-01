/*
 * @Author: dezhao.chen
 * @Date: 2020-04-18 17:10:19
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-08-14 14:02:58
 * @Description: 当开发环境请求带有@version的入口js时，重定向到移除@version/的路径
 */

const rx = /\/@cdnhost[\s\S]+@version/g;

export function redirectMiddlewareByExpress(req, res, next) {
    if (rx.test(req.path)) {
        const filePath = req.path.replace(rx, '');
        res.redirect(filePath);
        return;
    }
    next();
}

export function redirectMiddlewareByKoa(ctx, next) {
    const { req } = ctx;
    if (rx.test(req.path)) {
        const filePath = req.path.replace(rx, '');
        this.redirect(filePath);
        return;
    }
    next();
}

export default redirectMiddlewareByExpress;
