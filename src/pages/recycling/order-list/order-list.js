import { utils } from 'kld';
import storage from 'good-storage';

const page = {

    data() {

        return {

            orderList: []
        }
    },

    created() {

        let productId = storage.get('productId');

        let promise = utils.fetch({

            url: '/v16/iou/getLoanAndRepaying',
            data: { productId }
        })

        promise.then(res => {

            this.orderList = res;
        })
    },

    methods: {
        getLoanStatus(item) {


            if (item.status == 1 || item.status == 2 || item.status == 3 || item.status == 15) {

                return '待审核'
            }

            if (item.status == 12 || item.status == 13) {

                return '审核拒绝'
            }

            if (item.status == 5) {

                return '待回购'
            }

            if(item.status == 6){ //已放款
                
                if(item.repayStatus == 1){//未还款

                    if(item.overdueDays == 0) {//未逾期
 
                        return "待回购"
                    }

                    if(item.overdueDays > 0) {

                        return '已逾期'
                    }
                }

                if(item.repayStatus == 2){ //已还款
                
                    if(item.overdueDays == 0) {

                        return '已回购'
                    }

                    if(item.overdueDays > 0) {

                        return '逾期已回购'
                    }

                }
            }
        },

        isShowBtn(item) {

            if(item.status == 6) {

                if(item.repayStatus == 1) {

                    return true;
                }
            }

            if (item.status == 4 || item.status == 5) {

                return true;
            }

        },

        toRepurchase(item) {

            utils.go('repurchase-page', {

                planId: item.repayingSid,
                fundRepayAccountId: item.fundRepayAccountId,
                money: item.lendMoney + item.overdueFee
            })
        },

        toRenewLease(item) {
            
            storage.set('planId', item.repayingSid);
            storage.set('termDate', item.termDate);
            storage.set('fundRepayAccountId', item.fundRepayAccountId)

            utils.go('renew-lease-page')
        },

        buyBackPrice(item) {

            return item.overdueFee + item.lendMoney;
        }
    }
}



