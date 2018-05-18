import { utils } from 'kld';
import storage from 'good-storage';

export default {

    actions: {

        7: () => {

            let loanInfo = storage.get('loanInfo');
            let firmId = storage.get('firmId');
            let productId = storage.get('productId');

            let promise = utils.fetch({

                url: '/v16/iou/credatLoan',
                data: loanInfo,
                allResponse: true
            })

            promise.then((data) => {

                utils.tipInfo({

                    content: '提交成功',
                    callback() {
                        
                        if(firmId == 6 && productId == 7) {

                            utils.go('c2c-install-app')
                        } else {
        
                            utils.go('c2c-my-orderlist');
                        }
                        
                        
                    }
                })

            }, (data) => {

                if (data.code == 1) {
                    
                    if(firmId == 6 && productId == 7) {
                            
                            utils.go('c2c-install-app')
                        } else {
        
                            utils.go('c2c-my-orderlist');
                    }
                }
            })

        }
    },

    toDiffAction(productId) {

        if (this.actions[productId]) {

            this.actions[productId]();

            return true;
        } else {

            this.actions["7"]();

            return true;
        }

    },

    getSessionId() {

        function getSessionId() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            var uuid = s.join("");
            return uuid;
        }

        window.sessionId = getSessionId();
        window.ok = function(msg) {
            console.log(msg);
        };

        document.getElementsByTagName('script')[0].parentNode.appendChild(document.createElement('script')).src = 'https://pws.tongfudun.com/did/js/dp.js?appId=' + 5282868 + '&sessionId=' + window.sessionId + '&ts=' + new Date().getTime() + '&callback=ok', 0

    }
}