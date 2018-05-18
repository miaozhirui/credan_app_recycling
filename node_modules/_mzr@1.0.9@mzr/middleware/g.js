var sha1 = require('sha1');


module.exports = function (opts) {

    return async (ctx, next) => {

        if(ctx.method !== 'GET' || ctx.href.indexOf('ticket') > -1) {

            await next();

            return
        };

        //拿到参数
        var token = opts.wechat.token;
        var signature= ctx.query.signature;
        var echostr = ctx.query.echostr;
        var timestamp = ctx.query.timestamp;
        var nonce = ctx.query.nonce;

        //对token,timestamp,nonce排序
        var str = [timestamp,nonce,token].sort().join('');

        //sha1加密
        var sha = sha1(str);

        if(sha === signature) {

            ctx.body = echostr;
        } else {

            ctx.body = '请在微信公众号打开'
        }
    }
}

