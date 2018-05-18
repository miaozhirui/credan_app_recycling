import { utils, saveGlobalParams } from 'kld';
import storage from 'good-storage';

const page = {

    data() {

        return {
            isShowBorrowMoney: false
        }
    },
    
    created() {

        let productId = utils.getParams('productId'),
            firmId = utils.getParams('firmId'),
            baseId = utils.getParams('baseId'),
            channelSid = utils.getParams("channelSid"),
            loanerSid = utils.getParams('loanerSid');
        this.isShowBorrowMoney = utils.getParams('isShowBorrowMoney') == "false" ? false : true;
            
            saveGlobalParams({ productId, firmId, baseId, loanerSid, channelSid});
    },

    methods: {

        toBorrowMoney() {


            this.toTarget('timely-submit.html');
        },

        toBorrowMoneyList() {

            this.toTarget('c2c-my-orderlist.html');
        },

        toTarget(url) {

            let identityInfo = storage.get('identityInfo');
            let productId = utils.getParams('productId') || '';
            let baseId = utils.getParams('baseId') || '';
            let firmId = utils.getParams('firmId') || '';
            let loanerSid = utils.getParams('loanerSid') || '';

            if (!productId) {

                utils.tipInfo({

                    content: '请传入productId'
                })

                return;
            }
            
            if(!firmId) {

                utils.tipInfo({

                    content: '请传入firmId'
                })

                return;
            }
            if (identityInfo) {

                utils.go(url, {

                    productId,
                    baseId,
                    firmId
                });
            } else {

                let pathname = location.pathname.split('/');

                pathname.pop();

                utils.go('user-login', {

                    redirectUrl: `${location.origin}${pathname.join('/')}/${url}?productId=${productId}&baseId=${baseId}&firmId=${firmId}&loanerSid=${loanerSid}`
                })
               
            }
        }
    }
}