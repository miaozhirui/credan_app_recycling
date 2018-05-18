
var menu = require('./wx/menu')
//业务逻辑用来回复消息

module.exports = async function (state) {

    var message = state.message;
    console.log('======================')
    //事件消息
    if(message.MsgType === 'event'){

        //订阅(搜索公众号或者扫描二维码)
        if(message.Event === 'subscribe') {

            if(message.EventKey) {
                // message.ticket 换取二维码图片
                console.log('扫描二维码进来:' + message.EventKey + ' ' +message.ticket)
            }

            //设置回复的内容
            reply = `你订阅了公众号\r\n消息ID:${message.ToUserName}`
        }

        //取消订阅
        if(message.Event === 'unsubscribe') {

            console.log('用户取消关注了')
        }

        //上报的位置事件
        if(message.Event === 'LOCATION') {

            console.log(message)
            reply = `您上报位置是:${message.Latitude}/${message.Longitude}-${message.Precision}`
        }

        //点击菜单事件,不是一个view
        if(message.Event === 'CLICK') {

            console.log(message)
            reply = `您点击了菜单: ${message.EventKey}`;
        }

        //点击菜单中事件，是一个view, 一个连接
        if(message.Event === 'VIEW') {

            console.log(message)
            reply = `您点击了菜单中的连接：${message.EventKey}`;
        }

        //扫码推送事件
        if(message.Event === 'scancode_push') {

            console.log(message.ScanCodeInfo);
            console.log(message.ScanResult);
            reply = `您点击了菜单中: ${message.EventKey}`
        }

        //扫描等待事件
        if(message.Event === 'scancode_waitmsg') {

            console.log(message)
            reply = `您点击了菜单: ${message.EventKey}`
        }

        //弹出系统拍照
        if(message.Event === 'pic_sysphoto') {

            console.log(message.SendPicsInfo.PicList[0].item)
            reply = `您点击了菜单中: ${message.EventKey}`
        }

        //弹出拍照或者相册
        if(message.Event === 'pic_photo_or_album') {
            console.log(message.SendPicsInfo)
            reply = `您点击了菜单中: ${message.EventKey}`
        }

        //弹出微信相册发图器
        if(message.Event === 'pic_weixin') {

            console.log(message.SendPicsInfo);
            reply = `您点击了菜单中: ${message.EventKey}`
        }

        //弹出地理位置选择器的事件推送
        if(message.Event === 'location_select') {

            console.log(message.SendLocationInfo);
            reply = `您点击了菜单中: ${message.EventKey}`
        }

        //扫描事件
        if(message.Event === 'SCAN') {//得到的结果是一个32位无符号的整型

            reply = '您扫描了一下啊'
        }


    }

    //文本类型(用户输入的文本内容)
    if(message.MsgType === 'text') {

        var content = message.Content;

        //回复普通文本
        if(content === '1'){

            reply = '我要成为添加第一'
        }

        //回复普通文本
        if(content === '2') {


            reply = '我要成为添加第二啊'
        }

        //回复图文消息
        if(content === '3') {

            reply = [
                {
                    title: '图文1',
                    desc: '这里是一个描述',
                    picUrl: 'https://ss1.bdstatic.com/kvoZeXSm1A5BphGlnYG/skin_zoom/66.jpg?2',
                    url: 'https://www.baidu.com/'
                },
                {
                    title: '图文2',
                    desc: '这里是一个描述2',
                    picUrl: 'https://www.google.com.hk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                    url: 'https://www.jd.com/'
                }
            ]
        }

        //回复图片
        if(content === '5') {

            var data = await state.weixin.uploadMaterial('image', `${__dirname}/2.jpg`);


            reply = {
                type: 'image',
                mediaId: data.media_id
            }

        }

        //回复视屏
        if(content === '6') {

            var data = await state.weixin.uploadMaterial('video', `${__dirname}/3.mp4`);


            var reply = {
                type: 'video',
                mediaId:data.media_id,
                title: '运动会',
                desc: '快乐达第一季运动会'
            }
        }

        //回复音乐
        if(content === '7') {

            var data = await state.weixin.uploadMaterial('image', `${__dirname}/2.jpg`);


            var reply = {
                type: 'music',
                title: '回复音乐内容',
                desc: '放松一下',
                musicUrl:'http://mpge.5nd.com/2015/2015-9-12/66325/1.mp3',
                HQMusicUrl:'http://mpge.5nd.com/2015/2015-9-12/66325/1.mp3',
                mediaId:data.media_id
            }
        }

        if(content === '8') {

            var data = await state.weixin.uploadMaterial('image', `${__dirname}/2.jpg`, {type: 'image'});//上传第三个参数代表要上传的素材是永久的


            reply = {
                type: 'image',
                mediaId: data.media_id
            }
        }

        if(content === '9') {

            var data = await state.weixin.uploadMaterial('video', `${__dirname}/3.mp4`, {type: 'video', description: '{"title":"永久视屏"， "introduction":"介绍啊"}'});//上传第三个参数代表要上传的素材是永久的

            console.log('----------')
            console.log(data)
            reply = {
                type: 'video',
                mediaId: data.media_id
            }
        }

        //上传永久图文
        if(content === '10') {

            var picData = await state.weixin.uploadMaterial('image', `${__dirname}/2.jpg`, true);

            console.log(picData)
            console.log('end')
            // var media = {
            //
            //     "articles": [{
            //         "title": 'title',
            //         "thumb_media_id": picData['media_id'],
            //         "author": 'author',
            //         "digest": 'digest',
            //         "show_cover_pic": 1,
            //         "content": '没有内容',
            //         "content_source_url": 'http://github.com'
            //     }]
            // }
            // var data = await state.weixin.uploadMaterial('news',media, true);
            // console.log(data);
            // console.log('end');
            // //
            // data = await state.weixin.getMaterial('news', data.media,true);
            //
            // console.log(data)
            //
            // var items = data.news_item;
            // var news = [];
            //
            // items.forEach(function (item) {
            //     news.push({
            //
            //         title: item.title,
            //         desc: itme.digest,
            //         picUrl: picData.url,
            //         url: item.url
            //     })
            // })
            //
            // reply = news;
        }

        //创建一个标签
        if(content === '11') {
            var data = await state.weixin.createTag('台湾3');

            if(!data.errcode) {

                var tag = data.tag;

                reply = `标签创建成功:标签名-${tag.name},标签id-${tag.id}`
            } else {

                throw new Error(JSON.stringify(data))
            }
        }

        //获取标签列表
        if(content === '12') {

            var data = await state.weixin.getTags();

            reply = JSON.stringify(data.tags)
        }

        //更新标签
        if(content === '13') {

            var data = await state.weixin.updateTag(100,'上海新');

            reply = JSON.stringify(data)
        }

        //删除标签
        if(content === '14') {

            var data = await state.weixin.deleteTag(106);

            reply = JSON.stringify(data)
        }

        //为某些用户设置标签
        if(content === '15') {

            var data = await state.weixin.batchtagging([message.FromUserName], 100);
            reply = JSON.stringify(data);
        }

        //获取用户身上有哪些标签
        if(content === '16') {

            var data = await state.weixin.getidlist(message.FromUserName);

            reply = JSON.stringify(data)
        }

        //获取单个用户基本信息
        if(content === '17') {

            var data = await state.weixin.getUserInfo('ovs19twLqvwtVodDA2hmB2nBxtOM');

            reply = JSON.stringify(data)
        }

        //批量获取用户信息
        if(content === '18') {

            var data = await state.weixin.getBatchUserInfo([
                {
                    openid: message.FromUserName,
                    lang: 'zh_CN'//默认就是zh-CN
                },
                {
                    openid:'ovs19tzga41IXXH-5tljIiHzdS7w'
                }
            ])

            console.log(data)
        }

        //获取用户列表,获取到的是所有用户的openid组成的一个列表
        if(content === '19') {

            var data = await state.weixin.getUserList();

            reply = JSON.stringify(data);
        }

        //设置菜单
        if(content === '20') {

            var data = await  state.weixin.createMenu(menu);

            reply = JSON.stringify(data);
        }

        //生成账号二维码
        if(content === '21') {

            //生成临时二维码
            var tempQr = {
                "expire_seconds":604800,
                "action_name":"QR_SCENE",
                "action_info":{
                    scene: {
                        scene_id:123
                    }
                }
            }

            //生成永久二维码
            var permQr = {
                action_name: "QR_LIMIT_SCENE",
                action_info:{
                    scene: {
                        scene_id: '123'
                    }
                }
            }

            var permStrQr = {
                action_name: "QR_LIMIT_STR_SCENE",
                action_info:{
                    scene: {
                        scene_str: '123'
                    }
                }
            }

            var qr1 = await state.weixin.createQrcode(tempQr)
            var qr2 = await state.weixin.createQrcode(permQr)
            var qr3 = await state.weixin.createQrcode(permStrQr)


        }
        //生成短链接
        if(content === '22') {

            var longUrl = 'http://www.baidu.com';

            var shortData = await state.weixin.createShortUrl(longUrl);

            reply = JSON.stringify(shortData)
        }

        //语义回复
        if(content === '23'){

            var semanticData = {
                    "errcode":0,
                    "query":"我想看李连杰的英雄",
                    "type":"video",
                    "semantic":{
                    "details":{
                        "name":"英雄",
                        "category":"MOVIE",
                        "actor":"李连杰"
                        },
                    "intent":"SEARCH"
            }
        }

            var data = await state.weixin.semanticData(semanticData);

            reply = JSON.stringify(data);
        }
    }


    message.content = reply;

}