
module.exports = {

    'button': [

        {
            name: '点击事',
            type: 'click',
            key: 'menu_click'
        },
        {
            name:'点出菜单',
            'sub_button':[{

                type:'view',
                name:'百度',
                url:'http://www.baidu.com'
            },{

                type:'scancode_push',
                name:'扫描推送事件扫描推送事件',
                key:'qr_san'
            },{

                type:'scancode_waitmsg',
                name:'扫码推送',
                key:'qr_scan_wait'
            },{

                type:'pic_sysphoto',
                name:'弹出系统拍照',
                key:'pic_sysphoto'
            },{

                type:'pic_photo_or_album',
                name:'弹出拍照或者相册',
                key:'pic_photo_or_album'
            }]
        },
        {
            name:'点出菜单2',
            'sub_button':[
                {
                    name: '微信相册发图',
                    type: 'pic_weixin',
                    key: 'pic_weixin'
                },
                {
                    name: '地址位置选择',
                    type: 'location_select',
                    key: 'location_select'
                },
                // {
                //     name: '下发图片消息',
                //     type: 'media_id',
                //     'media_id': 'xxxx'
                // },
                // {
                //     name: '跳转图文消息',
                //     type: 'view_limited',
                //     'media_id': 'xxxx'
                // }
            ]
        }
    ]
}