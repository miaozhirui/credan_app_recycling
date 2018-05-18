var Koa = require('koa');

var weixinValid = require('./middleware/g');//验证开发者
var initToken = require('./middleware/initToken') //初始化token
var getRawBody = require('./middleware/getRawBody') //获取请求体
var parseXml = require('./middleware/parseXml') //解析请求体xml
var replyMessage = require('./middleware/replyMessage');
var config = require('./config/config');//全局配置文件
var fs = require('fs');
var utils = require('./libs/utils')
var ejs = require('ejs')
var Weixin = require('./libs/weixin')

var app = new Koa();


app.use(async (ctx, next) => {

    if(ctx.url.indexOf('ticket') > -1) {

        var weixin = await new Weixin(config.wechat);
        //1.拿到access_token
        var access_token = weixin.access_token;

        //根据access_token拿到ticket
        var data = await weixin.fetchTicket(access_token);

        var ticket = data.ticket;
        var url = decodeURIComponent(ctx.query.url);

        //根据url, ticket生成签名
        var signData = utils.sign({
            url: url,
            ticket: ticket
        })

        signData.appId = data.appId;

        // var html = fs.readFileSync('./index.html','utf8');

        // ctx.body = ejs.render(html, {
        //
        //     sign:signData
        // });
        ctx.body = signData;
        return;
    }

    await next();
})

//校验是合法的开发者
app.use(weixinValid(config))

//初始化token
app.use(initToken(config));

//获取请求体
app.use(getRawBody());

//解析请求体,将提交过来的xml,转成key，value形式的Json
app.use(parseXml())

//事件和消息回复
app.use(replyMessage());


module.exports = app;


