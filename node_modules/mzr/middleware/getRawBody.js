var getRawBody = require('raw-body')

module.exports = function () {


    return async (ctx, next) => {

        var data = await getRawBody(ctx.req,{
            length:ctx.length,
            limit:'1mb',
            encoding:'utf-8'
        })

        ctx.state.message = data;

        await next();
    }
}