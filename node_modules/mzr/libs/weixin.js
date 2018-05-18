//写一个微信类，用来管理微信交互的接口和票据的更新
var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var path = require('path');
var fs = require('fs');
var _ = require('lodash');

//调用微信的api接口
var prefix = 'https://api.weixin.qq.com/cgi-bin/';//调取微信api的前缀
var mpPrefix = 'https://mp.weixin.qq.com/cgi-bin/'

var api = {
    semanticUrl : 'https://api.weixin.qq.com/semantic/semproxy/search?',
    accessToken: prefix + 'token?grant_type=client_credential',
    tem:{
        upload:  prefix + 'media/upload?',//上传临时素材地址
        get: prefix + 'media/get?',//下载临时素材
    },
    permanent: {
        upload: prefix + 'material/add_material?', //上传永久素材地址
        get: prefix + 'material/get_material?',
        uploadNews: prefix +'material/add_news?', //上传图文消息
        uploadNewsPic: prefix + 'media/uploadimg?',
        del: prefix + 'material/del_material?',//删除永久素材
        update: prefix + 'material/update_news?',//修改永久素材
        count: prefix + 'material/get_materialcount?',//获取永久素材的总数
        batch: prefix + 'material/batchget_material?'//获取素材列表

    },
    tags: {

        create: prefix + "tags/create?",//创建标签
        get: prefix + 'tags/get?',//获取标签
        update: prefix + 'tags/update?',//修改标签
        delete: prefix + 'tags/delete?',//删除标签
        userGet: prefix + 'user/tag/get?',//某个标签下的用户的获取
        batchtagging: prefix + 'tags/members/batchtagging?',//为用户批量打标签
        batchuntagging: prefix + 'tags/members/batchuntagging?',//为用户批量删除标签
        getidlist: prefix + 'tags/getidlist?',//获取用户身上的标签列表
    },
    user: {
        remark:prefix + 'user/info/updateremark?',//设置用户备注名
        getUserInfo:prefix + 'user/info?', //获取单个的用户信息
        getBatchUserInfo: prefix + 'user/info/batchget?', //批量获取用户信息
        userLists: prefix + 'user/get?', //获取用户列表
    },
    menu: {
        create: prefix + 'menu/create?',//创建菜单
        get: prefix + 'menu/get?',//获取菜单
        del: prefix + 'menu/delete?',//删除菜单
        current: prefix + 'get_current_selfmenu_info?',//获取当前菜单
    },
    qrcode: {

        create: prefix + 'qrcode/create?',//生成ticket
        show:mpPrefix + 'showqrcode?',//通过ticket换取qrcode
    },
    shortUrl:{

        create: prefix + 'shorturl?'
    },
    ticket: {
        get: prefix + 'ticket/getticket?' //用于调取微信js sdk的临时票据
    }
}


var accessTokenFile = path.join(__dirname,'../config/access_token_file.json');
var ticketFile = path.join(__dirname, '../config/ticket_file.json');

function Weixin(opts) {

    this.appId = opts.appId;
    this.appSecret = opts.appSecret;
    var self = this;


    return self.fetchAccessToken();

}

// 验证token是否有效
Weixin.prototype.isValidAccessToken = function (data) {

    //如果数据不存在，获取票据不存在，或者过期时间不存在；则验证不通过
    if(!data || !data.access_token || !data.expires_in) return false;

    //验证是否过期了(当前时间和过期时间比对)
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    //如果过期时间大于当前时间，说明过期时间应该是未来的某个时间点，说明还没有过期
    if(expires_in > (now+20)){

        return true;
    } else {

        return false;
    }
}

//更新token信息
Weixin.prototype.updateAccessToken = async function () {

    var appId = this.appId;
    var appSecret = this.appSecret;
    var url = api.accessToken + '&appid='+ appId +'&secret='+appSecret;

    return new Promise(function (resolve, reject) {

        request({
            url: url,
            json: true
        }).then(function (data) {

            var data = data.body;

            var now = new Date().getTime()//拿到的是毫秒，所以都转成毫秒
            var expires_in = now + data.expires_in * 1000;

            data.expires_in = expires_in;

            resolve(data);
        })
    })

}

//获取token信息
Weixin.prototype.getAccessToken = async function () {

    let content;

    content = fs.readFileSync(accessTokenFile,'utf-8');

    return await content;

}

// 保存token信息
Weixin.prototype.saveAccessToken = function (data) {

    return new Promise(function (resolve, reject) {

        fs.writeFile(accessTokenFile, data, 'utf-8', function (error) {

            if(error){

                reject(error)
            } else {

                resolve(data)
            }


        })
    })
}


//上传素材
Weixin.prototype.uploadMaterial = function (type, material, permanent) {

    var self = this;
    var form = {}
    var uploadUrl = api.tem.upload;

    //如果是永久上传其他类型的话，用下面的地址
    if(permanent) {
        uploadUrl = api.permanent.upload

        _.extend(form, form);
    }


    //如果上传的是永久图片
    if(type === 'pic') {

        uploadUrl = api.permanent.uploadNewsPic;
    }

    if(type === 'news') {
        uploadUrl = api.permanent.uploadNews;
        form = material

    }

    if(type !== 'news') {


        form.media = fs.createReadStream(material)

    }

    return new Promise(function (resolve, reject) {
        self.fetchAccessToken()
            .then(function (data) {

                var url = uploadUrl + 'access_token=' + data.access_token;

                if(!permanent){

                    url += '&type=' + type;
                } else {

                    form.access_token = data.access_token;
                }

                var options = {

                    method: 'POST',
                    url: url,
                    json: true
                }

                if(type === 'news'){

                    options.body = form;
                } else {

                    options.formData = form;
                }
                console.log(options,'----------------')
                request(options)
                    .then(function (response) {

                        var body = response.body;

                        if(body){
                            resolve(body)
                        } else {

                            throw new Error('upload materia fails')
                        }
                    })
                    .catch(function (error) {
                        reject(error)
                    })
            })
    })

}

//获取素材
Weixin.prototype.getMaterial = function (type, mediaId, permanent) {

    var self = this;
    var form = {}
    var getUrl = api.tem.get;

    //如果是永久上传其他类型的话，用下面的地址
    if(permanent) {
        getUrl = api.permanent.get

    }

    return new Promise(function (resolve, reject) {
        self.fetchAccessToken()
            .then(function (data) {

                var url = getUrl + 'access_token=' + data.access_token + '&media_id='+ mediaId;

                if(!permanent && type ==='video'){

                    url.replace('https://', 'http://')
                }


                resolve(url)
            })
    })

}

//删除素材
Weixin.prototype.deleteMaterial = function (mediaId) {

    var self = this;
    var form = {
        media_id:mediaId
    }

    return new Promise(function (resolve, reject) {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.del + 'access_token=' + data.access_token + 'media_id=' + mediaId;



                request({method:'POST',url:url,json:true})
                    .then(function (response) {

                        var body = response['body']

                        if(body){
                            resolve(body);
                        } else {

                            throw new Error('delete material fails')
                        }
                    })
            })
    })
}

//更新素材
Weixin.prototype.updateMaterial = function (mediaId, news) {

    var self = this;
    var form = {
        media_id: mediaId
    }

    _.extend(form, news);

    return new Promsie(function (resolve, reject) {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.update + 'access_token=' + data.access_token;

                request({method:'POST',url:url, formData:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update material fail')
                        }
                    })
            })
    })
}

//获取素材总数
Weixin.prototype.countMaterial = function () {

    var self = this;


    return new Promsie(function (resolve, reject) {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.update + 'access_token=' + data.access_token;

                request({method:'GET',url:url,json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update material fail')
                        }
                    })
            })
    })
}

//获取素材列表
Weixin.prototype.batchMaterial = function (options) {

    var self = this;

    options.type = options.type || 'image';
    options.offset = options.offset || 0;
    options.count = options.count || 1;

    return new Promsie(function (resolve, reject) {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.batch + 'access_token=' + data.access_token;

                request({method:'POST',url:url,body:options, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update material fail')
                        }
                    })
            })
    })
}

//获取素材总数
Weixin.prototype.countMeterial = function () {

    var self = this;


    return new Promsie(function (resolve, reject) {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.update + 'access_token=' + data.access_token;

                request({method:'GET',url:url,json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update material fail')
                        }
                    })
            })
    })
}

//创建用户标签
Weixin.prototype.createTag = function (tagname) {

    var self = this;


    return new Promise(function (resolve, reject) {

        self.fetchAccessToken()
            .then(function (data) {
                console.log(data)
                var url = api.tags.create + 'access_token=' + data.access_token;

                var form = {

                    tag:{
                        name:tagname
                    }
                }

                request({method:'POST',url:url,body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('create tagname fail')
                        }
                    })
            })
    })
}

//获取标签列表
Weixin.prototype.getTags = function (tagname) {

    var self = this;


    return new Promise(function (resolve, reject) {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.tags.get + 'access_token=' + data.access_token;

                request({url:url, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('get Tags fail')
                        }
                    })
            })
    })
}

//更新标签
Weixin.prototype.updateTag = function (id, name) {

    var self = this;


    return new Promise(function (resolve, reject) {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.tags.update + 'access_token=' + data.access_token;

                var form = {
                    tag: {
                        id: id,
                        name:name
                    }
                }

                request({method:'POST', url:url, body:form,  json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update tag fail')
                        }
                    })
            })
    })
}

//删除标签
Weixin.prototype.deleteTag = function (id) {

    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.tags.delete + 'access_token=' + data.access_token;

                var form = {
                    tag: {
                        id: id,
                    }
                }

                request({method:'POST', url:url, body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update tag fail')
                        }
                    })
            })
    })
}

//获取某个标签下的粉丝的列表
Weixin.prototype.userGet = function (id, nextOpenId) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.tags.userGet + 'access_token=' + data.access_token;

                var form = {
                    tag: {
                        tagid: id,
                        next_openid:nextOpenId
                    }
                }

                request({method:'POST', url:url, body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update tag fail')
                        }
                    })
            })
    })
}

//批量为用户打标签
Weixin.prototype.batchtagging = function (openidList, tagId) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.tags.batchtagging + 'access_token=' + data.access_token;

                var form = {
                    openid_list: openidList,
                    tagid:tagId
                }

                request({method:'POST', url:url, body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update tag fail')
                        }
                    })
            })
    })
}


//批量为用户取消标签
Weixin.prototype.batchuntagging = function (openidList, tagId) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.tags.batchuntagging + 'access_token=' + data.access_token;

                var form = {
                    tag: {
                        openid_list: openidList,
                        tagid:tagId
                    }
                }

                request({method:'POST', url:url, body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update tag fail')
                        }
                    })
            })
    })
}

//获取用户身上有哪些标签列表
Weixin.prototype.getidlist = function (openid) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.tags.getidlist + 'access_token=' + data.access_token;

                var form = {
                    openid:openid
                }

                request({method:'POST', url:url, body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('update tag fail')
                        }
                    })
            })
    })
}

//对用户重命名
Weixin.prototype.userRemark = function (openId,remark) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {
                var url = api.user.remark + 'access_token=' + data.access_token;

                var form = {
                    openid:openId,
                    remark:remark
                }

                request({method:'POST', url:url, body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('user remark fail')
                        }
                    })
            })
    })
}

//获取单个用户信息
Weixin.prototype.getUserInfo = function (openId, lang) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var lang = lang || 'zh_CN';

                var url = `${api.user.getUserInfo}access_token=${data.access_token}&openid=${openId}&lang=${lang}`;

                request({method:'GET', url:url, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('user remark fail')
                        }
                    })
            })
    })
}

//批量获取用户信息
Weixin.prototype.getBatchUserInfo = function (userList) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var lang = lang || 'zh_CN';

                var url = `${api.user.getBatchUserInfo}access_token=${data.access_token}`;

                var form = {
                    user_list: userList
                }

                request({method:'POST', url:url, body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('user remark fail')
                        }
                    })
            })
    })
}

//获取用户列表
Weixin.prototype.getUserList = function (nextOpenId) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var lang = lang || 'zh_CN';

                var url = `${api.user.userLists}access_token=${data.access_token}`;

                if(nextOpenId) {

                    url += `&next_openid=${nextOpenId}`;
                }

                request({method:'GET', url:url, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('user remark fail')
                        }
                    })
            })
    })
}

//##################### 菜单操作==================
//创建菜单
Weixin.prototype.createMenu = function (menu) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var url = `${api.menu.create}access_token=${data.access_token}`;

                request({method:'POST', url:url, body:menu, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('create menu fail')
                        }
                    })
            })
    })
}

//获取菜单
Weixin.prototype.getMenu = function () {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var url = `${api.menu.get}access_token=${data.access_token}`;

                request({method:'GET', url:url, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('GET menu fail')
                        }
                    })
            })
    })
}

//删除菜单
Weixin.prototype.deleteMenu = function () {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var url = `${api.menu.del}access_token=${data.access_token}`;

                request({method:'GET', url:url, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('GET menu fail')
                        }
                    })
            })
    })
}

//获取当前菜单的配置
Weixin.prototype.getCurrentMenu = function () {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var url = `${api.menu.current}access_token=${data.access_token}`;

                request({method:'GET', url:url, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('GET current menu fail')
                        }
                    })
            })
    })
}

//创建账号二维码
Weixin.prototype.createQrcode = function (qr) {
    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var url = `${api.qrcode.create}access_token=${data.access_token}`;

                request({method:'POST', url:url, body:qr, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('GET current menu fail')
                        }
                    })
            })
    })
}

//显示账号二维码图片
Weixin.prototype.showQrcode = function (ticket) {

    retrun `${api.qrcode.show}ticket=${encodeURI(ticket)}`

}

//创建短链接
Weixin.prototype.createShortUrl = function (url, urlType) {

    urlType = urlType || 'long2short';

    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var url = `${api.shortUrl.create}access_token=${data.access_token}`;

                var form = {
                    action: urlType,
                    long_url: url
                }

                request({method:'POST', url:url, body:form, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('create shortUrl fail')
                        }
                    })
            })
    })
}

//语义化只能接口
Weixin.prototype.semanticData = function (semanticData) {

    var self = this;

    return new Promise(function (resolve, reject)   {

        self.fetchAccessToken()
            .then(function (data) {

                var url = `${api.semanticUrl}access_token=${data.access_token}`;

                semanticData.appid = data.appId;

                request({method:'POST', url:url, body:semanticData, json:true})
                    .then(function (response) {

                        var data = response['body']

                        if(data) {

                            resolve(data)
                        } else {

                            throw new Error('semantic  fail')
                        }
                    })
            })
    })
}


//获取token信息
Weixin.prototype.fetchAccessToken = function () {

    var self = this;

    if(this.access_token && this.expires_in) {

        if(this.isValidAccessToken(this)) {

            return Promise.resolve(this);
        }
    }

    return new Promise(function (resolve, reject) {

        self.getAccessToken()
        //校验信息token是否合法，不合法获取最新token
            .then(data => {

                try {
                    //将json字符串转成json对象
                    data = JSON.parse(data);
                }catch (e){
                    //如果数据不正常需要更新票据
                    return self.updateAccessToken()
                }

                //判断票据是否过去
                if(self.isValidAccessToken(data)) {

                    return data;
                } else {

                    return self.updateAccessToken();
                }
            })
            //保存token
            .then(function (data) {
                //将拿到的合法票据保存到当前的实例对象上，已提供后面的使用
                self.access_token = data.access_token;
                self.expires_in = data.expires_in;

                //将最新有效的token保存到本地文件
                return self.saveAccessToken(JSON.stringify(data));


            })
            .then(function (data) {

                resolve(self)
            })
    })

}

//获取token信息
Weixin.prototype.getTicket = async function () {

    let content;

    content = fs.readFileSync(ticketFile,'utf-8');

    return await content;

}

//获取ticket票据
Weixin.prototype.fetchTicket = function (access_token) {

    var self = this;

    return new Promise(function (resolve, reject) {

        self.getTicket()
        //校验信息token是否合法，不合法获取最新token
            .then(data => {

                try {
                    //将json字符串转成json对象
                    data = JSON.parse(data);
                }catch (e){
                    //如果数据不正常需要更新票据
                    return self.updateTicket(access_token)
                }

                //判断票据是否过去
                if(self.isValidTicket(data)) {

                    return data;
                } else {

                    return self.updateTicket(access_token);
                }
            })
            //保存token
            .then(function (data) {

                self.ticket = data.ticket;
                self.expires_in = data.expires_in;
                return self.saveTicket(JSON.stringify(data));

            })
            .then(function (data) {

                resolve(self)
            })
    })

}

//更新ticket票据
Weixin.prototype.updateTicket = async function (access_token) {

    var url = `${api.ticket.get}access_token=${access_token}&type=jsapi`;

    return new Promise(function (resolve, reject) {

        request({
            url: url,
            json: true
        }).then(function (data) {

            var data = data.body;

            var now = new Date().getTime()//拿到的是毫秒，所以都转成毫秒
            var expires_in = now + data.expires_in * 1000;

            data.expires_in = expires_in;

            resolve(data);
        })
    })

}

// 保存ticket信息
Weixin.prototype.saveTicket = function (data) {

    return new Promise(function (resolve, reject) {

        fs.writeFile(ticketFile, data, 'utf-8', function (error) {

            if(error){

                reject(error)
            } else {

                resolve(data)
            }


        })
    })
}

// 验证ticket是否过期
Weixin.prototype.isValidTicket = function (data) {

    //如果数据不存在，获取票据不存在，或者过期时间不存在；则验证不通过
    if(!data || !data.ticket || !data.expires_in) return false;

    //验证是否过期了(当前时间和过期时间比对)
    var ticket = data.ticket;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    //如果过期时间大于当前时间，说明过期时间应该是未来的某个时间点，说明还没有过期
    if(expires_in > (now+20)){

        return true;
    } else {

        return false;
    }
}

module.exports = Weixin;
