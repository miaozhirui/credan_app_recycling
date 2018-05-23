import { utils } from 'kld';
import storage from 'good-storage';
import jpush from './listen-native/jpush.js';
import contact from './listen-native/contact.js';//获取联系人信息
import Location from './listen-native/location.js';//获取地理位置
import Device from './listen-native/device.js'//获取设备信息

let currentPage = {

    init: function() {

        this.initDevice(); //初始化设备
        this.initElement(); //初始化元素
        this.bindEvent(); //bind事件
        this.initUrlStack(); //初始化路由栈
        
        
    },

    initDevice() {

        if (process.env.NODE_ENV == 'mock' || process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'production') {

            document.addEventListener('deviceready', this.onDeviceReady, false);

        }
    },

    onDeviceReady() {

        // jpush.init();
         contact.init();
         // (new Location()).init();
         (new Device()).init();
    },

    initElement() {

        this.navBackBtn = document.querySelector('#back-icon');
        this.navBellBtn = document.querySelector('#bellIcon');
        this.redHot = document.querySelector('#redHot');
        this.tabbarsWrap = document.querySelector('.global-tab-bar-wrap');
        this.tabbars = document.querySelector('.global-tab-bar');

        this.tabbarsWrap && (this.tabbarsWrap.style.display = "block");

        //设置是否显示消息红点
        this.redHot && this.setIsShowRedHost();
    },

    bindEvent() {

        //给返回按钮添加点击事件
        this.navBackBtn && this.navBackBtn.addEventListener('click', function() {

            let urlStacks = storage.get('urlStacks');

            let previousUrl = urlStacks.pop();

            storage.set('urlStacks', urlStacks);

            window.location.href = previousUrl;
        })

        //给消息按钮添加点击事件
        this.navBellBtn && this.navBellBtn.addEventListener('click', function() {

            utils.go('news-list');
        })

        //给tab添加事件
        this.tabbars && this.tabbars.addEventListener('click', function(event) {

            let className = event.target.className;

            if (className.indexOf('one') > -1) {

                if (location.href.indexOf('select-product') > 0) return;

                utils.go('select-product');
            }

            if (className.indexOf('two') > -1) {

                if (location.href.indexOf('my-page') > 0) return;



                utils.go('my-page');
            }
        })
    },

    initUrlStack() {

        if (this.isHopePage()) {

            storage.set('urlStacks', []);
        }
    },

    //需要清除路由堆栈的页面
    isHopePage() {

        let result = location.href.indexOf('select-product') > -1 ||
            location.href.indexOf('my-page') > -1;

        return result;
    },

    setIsShowRedHost() {

        let isHasNotReadNews = storage.get('isHasNotReadNews');

        if (isHasNotReadNews) {

            this.redHot.style.display = 'block';
        }
    },

  

};

//初始化
currentPage.init();