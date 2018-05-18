var crypto = require('crypto')

module.exports = {

    createNonce: function () {

        return Math.random().toString(36).slice(2,15);
    },
    
    createTimeStamp: function () {

        return parseInt(new Date().getTime()/1000,10) + ''
    },

    sign: function (options) {

        var url = options.url;
        var ticket = options.ticket;
        var noncestr = this.createNonce();
        var timestamp = this.createTimeStamp();

        var signature = this._sign(noncestr, ticket, timestamp, url);

        return {

            nonceStr: noncestr,
            timestamp: timestamp,
            signature: signature
        }
    },
    _sign: function (noncestr, ticket, timestamp, url) {

        var params = [

            'noncestr=' + noncestr,
            'jsapi_ticket=' + ticket,
            'timestamp=' + timestamp,
            'url=' + url
        ]

        var str = params.sort().join('&');
        var shasum = crypto.createHash('sha1');

        shasum.update(str);

        return shasum.digest('hex');
    }
}