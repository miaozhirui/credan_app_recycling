import { utils } from 'kld';
import data from './other/data'
import getOrderInfo from './other/getOrderInfo';
import storage from 'good-storage';
import { toLLPay } from 'common/js/pay';

const page = {

    data() {

        return {

            recyclingDays: [],
            day: 7,
            isAgreeProtocal: false,
            orderInfo: {},
            lendTime:''
        }
    },

    created() {

        this.recyclingDays = data.recyclingDays;
        
        this.planId = storage.get('planId');
        this.lendTime = storage.get('lendTime');
        
        let promise = getOrderInfo({

            day: this.day
        });

        promise.then(res => {

            this.orderInfo = res;
        })
    },

    computed: {

        dailyRent() {

            let dailyRent = (this.orderInfo.lendMoney - this.orderInfo.payMoney) / this.orderInfo.termNum;

            return dailyRent;
        },
        totalRent() {

            let totalRent = this.orderInfo.lendMoney - this.orderInfo.payMoney;

            return totalRent;
        },
        getExpireDate() {
        
            return +this.lendTime + this.day * 24 * 60 * 60 * 1000;
        }
    },

    methods: {

        toPay() {
           
            let data = {

                fundRepayAccountId: 501,
                planId: this.planId,
                redirectUrl: 'close-pay-window',
                putOffDays: this.day
            }

            let promise = utils.fetch({

                url: "/wx/v16/deferrdePayLLPay",
                data
            })

            promise.then(data => {

                if (data.statusCode == 5004) {

                    utils.tipInfo({

                        content: '前往支付页面'
                    })

                    toLLPay(data.data);
                } else {

                    utils.tipInfo({
                        content: data.message
                    })
                }
            })
            
        },

        changeDays(item) {

            let params = {

                day: item.day
            }

            let promise = getOrderInfo(params);

            promise.then(res => {
            
                this.orderInfo = res;
                
                this.recyclingDays.forEach(item => {

                    item.selected = false;
                })

                item.selected = true;
                this.day = item.day;
            })


        },

        toCheckProtocal() {

            this.isAgreeProtocal = !this.isAgreeProtocal;
        },

        helpOne() {

            $alert.show({

                content: '以实际审核时间为准'
            })
        }
    }
}




