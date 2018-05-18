import { utils } from 'kld';
import storge from 'good-storage'

const page = {

    data() {

        return {

        }
    },

    created() {
        
        let code = utils.getParams('code');
        let fundAccountId = storge.get('fundAccountId');
        let loanRepayingId = storge.get('loanRepayingId');
        let weixinPayRedirectUrl = storge.get('weixinPayRedirectUrl');

        let promise = utils.fetch({

            url: '/v3/loanRepaid/app/createdAllRepaidOrder',
            data:{
                code, 
                fundAccountId, 
                loanRepayingId,
                redirectUrl: weixinPayRedirectUrl
            }
        })

        promise.then(data => {

            location.href = data;
        })
    },

    methods: {
        
    }
}

