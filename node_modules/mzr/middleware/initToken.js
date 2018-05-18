var Weixin = require('../libs/weixin');

module.exports = function (opts) {

    return async (ctx, next) => {


        //管理token；并且把token挂载在微信对象上，供下文使用
        var weixin = await new Weixin(opts.wechat);

        ctx.state.weixin = weixin;

        await next();
    }
}