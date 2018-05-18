var templateJs = require('../libs/template')
var reply = require('../reply');

module.exports = function () {

    return async (ctx,next) => {

        //设置回复的消息，数据是外面的业务逻辑传进去的
        await reply(ctx.state);

        //将json消息，转成xml
        templateJs(ctx.state);

        ctx.status = 200;
        ctx.type = 'text/xml';
        ctx.body = ctx.state.message
    }
}