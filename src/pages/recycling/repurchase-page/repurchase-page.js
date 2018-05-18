import { utils } from 'kld';
import { toLLPay } from 'common/js/pay';

const page = {

    data() {

        return {
            
            money: ''
        }
    },

    created() {
    
        this.planId = utils.getParams('planId');
        this.fundRepayAccountId = utils.getParams('fundRepayAccountId');
        this.money = utils.getParams('money');
    },

    methods: {

        toPay() {

            let data = {

                aheadRepay: 0,
                planId: this.planId,
                fundRepayAccountId: this.fundRepayAccountId,
                redirectUrl: utils.getllPayRedirectUrl()
            }

            let promise = utils.fetch({

                url: '/wx/v16/LLPayInterface',
                data
            })

            promise.then(data => {

                if (data.statusCode == 5004) {

                    utils.tipInfo({

                        content: '前往支付页面',

                    })

                    toLLPay(data.data);
                    
                  
                } else {

                    utils.tipInfo({

                        content: data.message
                    })
                }
            })
        }
    }
}