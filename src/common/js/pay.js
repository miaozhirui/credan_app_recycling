import { utils } from 'kld';
import storage from 'good-storage';

export const toLLPay = (params) => {
    

    if (process.env.NODE_PLATFORM != 'app') {

        //浏览器端的支付方式=======
        storage.set('payInfo', params);

        utils.go("ll2pay-page");

        return;
    }

    var browser = utils.openBrowser({

        url: `ll2pay-page.html`,
        start(event) {

            // {"type":"loadstart","url":"http://www.baidu.com/"}
            if (event.url.indexOf('close-pay-window') > -1) {

                browser.close();

                utils.go('order-list');

            }

            if (event.url.indexOf('ll2pay-page' > -1)) {

                browser.executeScript({
                    code: `window.llpayData = ${params}`
                })
            }
        },
        exit(event) {

            // alert(11111)
            // utils.go('user-account-homepage');
            // window.location.reload();
        }
    })


}