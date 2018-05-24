import { utils } from 'kld';
import storage from 'good-storage';
import data from './other/data';
import Agreement from 'components/agree-loan-agreement/index.vue';
import agreement from './other/agreement.js';

const page = {

    components:{

        Agreement
    },

    data() {

        return {

            productList: [], //产品列表
            productPrice: '3000',
            isAgreeProtocal: false,
            agreement:agreement,
            isShowAgreement: false
        }
    },

    created() {
      
        let phoneLists = data.phoneLists;
        let productId = 10;
        let firmId = 11;

        storage.set('productId', productId);
        storage.set('firmId', firmId)

        this.productList = phoneLists;

        utils.addEvent('产品选择页面到达');
    },


    methods: {

        toOrderInfo() {
            
            // if(!this.isAgreeProtocal){

            //     utils.tipInfo({

            //         content:"请勾选协议",
                    
            //     })
            //     return;
            // } 

            
            let promise = $confirm.show({

                content: '若因不便不能立即寄出手机，可以短期租赁该手机?',
                cancelText: '不租赁',
                okText:'租赁'
            })

            promise.then(res => {

                if (res) {

                    storage.set('productPrice', this.productPrice);

                    utils.go('order-info');
                }
            })


        },
        changeProduct(item) {

            this.productList.forEach(item => {

                item.selected = false;
            })

            item.selected = true;
            this.productPrice = item.price;
        },
        toCheckProtocal() {

            this.isAgreeProtocal = !this.isAgreeProtocal;
        },
        showAgreement() {

            this.isShowAgreement = true;
        },
        showAgreement() {

            this.isShowAgreement = true;
        },
        watchIsShow(val) {

            this.isShowAgreement = val;
        }
    }
}