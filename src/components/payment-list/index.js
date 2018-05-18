import { utils } from 'kld';
import storage from 'good-storage';

export default {

    props: {

        isShowPaymentList: {

            type: Boolean,
            required: true
        },
        paymentListData: {

            type: Array,
            required: true
        },
        orderInfo: {

            type: Object,
            required: true
        }
    },

    methods: {

        selectPayment(item) {

            this.paymentListData.forEach(i => {

                i.selected = false;
            })

            item.selected = true;

            this.$forceUpdate()

        },

        toPay() {

            let paymentWay;

            this.paymentListData.forEach(item => {

                if (item.selected) {

                    paymentWay = item;
                }
            })

            if (!paymentWay) {

                utils.tipInfo({ content: '请选择支付方式' })
            }


            //快捷支付
            if (paymentWay.payGatewayType == 501) {

                this.fastPay(paymentWay)
            }

            //微信支付
            if (paymentWay.payGatewayType == 801) {

                this.weixinPay(paymentWay)
            }
        },
        
        //快捷支付
        fastPay(data) {

            let params = {

                aheadRepay: 0,
                planId: this.orderInfo.repayingSid,
                fundRepayAccountId: this.orderInfo.fundRepayAccountId,
                redirectUrl: location.href
            }

            let promise = utils.fetch({

                url: '/wx/v16/LLPayInterface',
                data:params
            })

            promise.then(data => {

                if (data.statusCode == 5004) {

                    utils.tipInfo({

                        content: '前往支付页面',

                    })

                    storage.set('payInfo', data.data);

                    utils.go("ll2pay-page");
                } else {

                    utils.tipInfo({

                        content: data.message
                    })
                }
            })
        },
        
        //微信支付
        weixinPay(data) {

            let redirectUrl = "http://uctest.credan.com/c2c/pages/weixin2pay-page.html"

            if(process.env.NODE_ENV == 'production') {

                redirectUrl = "/c2c/pages/weixin2pay-page.html"
            }
          
            let params = {

                fundAccountId: data.id,

                redirectUrl: utils.urlSpliceParmas({
                    
                    url: redirectUrl
                })
            }

            let promise = utils.fetch({

                url: '/v3/loanRepaid/app/getWeChatCode',
                data:params
            })

            promise.then(response => {
                
                //微信支付成功之后的回调之地
                storage.set('weixinPayRedirectUrl', location.href);

                //存储微信支付时需要的参数
                storage.set('fundAccountId', data.id);
                storage.set('loanRepayingId', this.orderInfo.loanRepayingId)
                
                location.href=response
            })
        }
    }

}



