import { utils } from 'kld'
import storage from 'good-storage';

export default data => {

    return new Promise((resolve, reject) => {

         let lendMoney = storage.get('productPrice');
         let productId = storage.get('productId');
         let accountId = 0;
         let termNum = data.termNum

         let params = {

            lendMoney,
            productId,
            accountId,
            termNum
         }

        let promise = utils.fetch({

            url: '/v16/get/loanInfo',
            data: params
        })


        promise.then(res => {


            resolve(res);
        })
    })
}