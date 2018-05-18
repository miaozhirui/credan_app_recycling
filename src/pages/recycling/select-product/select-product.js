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
            productPrice: '4000',
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
    },


    methods: {

        toOrderInfo() {
            
            if(!this.isAgreeProtocal){

                utils.tipInfo({

                    content:"请勾选协议"
                })
                return;
            } 

            
            let promise = $confirm.show({

                content: '是否需要继续使用该手机?'
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