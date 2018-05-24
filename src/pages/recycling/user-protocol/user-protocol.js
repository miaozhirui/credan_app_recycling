import { utils } from 'kld';
import protocol from './other/protocol';
import storage from 'good-storage';

const page = {

    data() {

        return {

            protocol: protocol
        }
    },

    methods: {

        cancel() {

            utils.go('cash-submit')
        },

        confirm() {

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

                        utils.go('order-list');

                    }
                })

            }, (data) => {

                if (data.code == 1) {

                    utils.go('order-list');
                }
            })
        },

        toBottom() {

            let clientHeight = document.documentElement.clientHeight; //可视区域的高
            let scrollHeight = document.documentElement.scrollHeight; //正文全文高

            document.documentElement.scrollTop = scrollHeight - clientHeight;

        }
    }
}