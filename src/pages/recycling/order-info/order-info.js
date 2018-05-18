import { utils } from 'kld';
import data from './other/data'
import getOrderInfo from './other/getOrderInfo';
import storage from 'good-storage';
import Agreement from 'components/agree-loan-agreement/index.vue';
import agreement from './other/agreement.js';

const page = {

    components:{
        Agreement
    },

    data() {

        return {

            recyclingDays: [],
            day: 7,
            isAgreeProtocal: false,
            orderInfo: {
                lendMoney: 0,
                payMoney: 0,
                termNum: 0
            },
            agreement:agreement,
            isShowAgreement:false
        }
    },

    created() {

        this.recyclingDays = data.recyclingDays;
        this.productId = storage.get('productId');
        this.productPrice = storage.get('productPrice');


        let params = {

            termNum: this.day,
        }

        let promise = getOrderInfo(params);

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

        now() {

            return new Date().getTime();
        },

        expireDate() {

            return new Date().getTime() + this.day * 24 * 60 * 60 * 1000;
        }
    },

    methods: {

        toSubmit() {

            if (!this.isAgreeProtocal) {

                utils.tipInfo({

                    content: '请勾选协议'
                })

                return;
            }

            let params = {
                "productType": this.productId, //产品类型
                "orderAmount": this.productPrice, //订单金额
                "term": this.day, //期数
                "unit": "D", //单位
                "quota": 1,
                "transferUse": "手机回购" //借款用途
            }

            let promise = utils.fetch({

                url: '/v2/cashloan/submitOrderInfo',
                data: params,
                api: true
            })

            promise.then(res => {

                let loanInfo = {
                    lendMoney: this.productPrice,
                    productId: storage.get('productId'),
                    periodCount: 1,
                    termNum: this.day,
                    termUnit: 1,
                    firmId: storage.get('firmId')
                }

                storage.set('loanInfo', loanInfo);

                utils.go('cash-submit')
            })


        },

        changeDays(item) {

            let params = {

                termNum: item.day
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

                content:"以实际审核时间为准"
            })
        },
        helpTwo() {

            $alert.show({

                content: "以实际审核时间为准"
            })
        },

        showAgreement() {

            this.isShowAgreement = true;
        },
        watchIsShow(val) {

            this.isShowAgreement = val;
        }
    }
}







