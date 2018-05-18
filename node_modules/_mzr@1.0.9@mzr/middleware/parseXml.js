var xml2js = require('xml2js');
var jsonMessage = {}

module.exports = function () {

    return async (ctx, next) => {
        
        //xml
        var message = ctx.state.message;

        //json
        message = await parseXml(message);
        // console.log(data);需要将数据格式化成标准的Key,value形式的数据
        /*
         { xml:
         { ToUserName: [ 'gh_b53757b93b81' ],
         FromUserName: [ 'ovs19twLqvwtVodDA2hmB2nBxtOM' ],
         CreateTime: [ '1523374924' ],
         MsgType: [ 'text' ],
         Content: [ 'fsdf' ],
         MsgId: [ '6542845478543115232' ] } }
        * */
        // console.log(data)

        //一唯的数据
        formatMessage(message);
        /*
         { ToUserName: 'gh_b53757b93b81',
         FromUserName: 'ovs19twLqvwtVodDA2hmB2nBxtOM',
         CreateTime: '1523376799',
         MsgType: 'text',
         Content: 'fdsf',
         MsgId: '6542853531606795414' }
        * */

        ctx.state.message = jsonMessage;


        await next();
    }
}

/**
 * 解析xml
 * @param data
 * @returns {Promise}
 */
function parseXml(data) {
    
    return new Promise(function (resolve, reject) {

        xml2js.parseString(data, function (err,result) {

            if(err) throw Error(err);

            resolve(result);
        })
    })
}

/**
 * 格式化数据,将提交过来的Post数据转换成标准的Key,value形式
 */


function formatMessage(data) {

    var keys = Object.keys(data);

    for(var i=0; i<keys.length; i++) {

        var key = keys[i];
        var item = data[key];

        if(Object.prototype.toString.call(item) === "[object Array]" && item.length === 1){

            jsonMessage[key] = item[0];
        }

        if(typeof item === 'object') {

            formatMessage(item)
        }

    }


}

