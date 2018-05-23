import { utils } from 'kld';
import storage from 'good-storage';

const page = {

    data() {

        return {
            
            phone:''
        }
    },

    created() {

        this.phone = storage.get('phone');

        utils.judgeIsLogin({

            isNeedIdentity: true
        })

        utils.addEvent('我的页面到达');
    },

    computed:{
        
        showPhone() {

            return this.phone.slice(0,3) + '****' + this.phone.slice(-4);
        }
    },

    methods: {

        toOrderList() {

            utils.go('order-list');
        },
        logout() {

            storage.remove('identityInfo');
            storage.remove('phone');

            utils.go('user-login')
        }
    }
}