import { utils } from 'kld';
import storage from 'good-storage';

const page = {

    data() {

        return {

            payData: null
        }
    },

    created() {


    },

    methods: {

    },

    mounted() {

        if (process.env.NODE_PLATFORM != 'app') {
            
            this.payData = storage.get('payInfo');

            Vue.nextTick(() => {

                document.querySelector('#llpay').submit();
            })
            return;
        }


        let timer = setInterval(() => {

            if (window.llpayData) {

                clearInterval(timer);

                this.payData = JSON.stringify(window.llpayData);

                Vue.nextTick(() => {

                    document.querySelector('#llpay').submit();
                })
            }
        }, 1000);
    }
}