import { utils } from 'kld';

const page = {

    data() {

        return {

        }
    },

    methods: {
        
        toOrderList() {

            utils.go('order-list')
            utils.addEvent('审核页面到达');
        }
    }
}

