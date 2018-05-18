import { utils } from 'kld'
import storage from 'good-storage';

export default data => {

    return new Promise((resolve, reject) => {

         let delayDays = data.day;
         let planId = storage.get('planId');

         let params = {

            delayDays,
            planId
         }

        let promise = utils.fetch({

            url: '/v16/putOffFee',
            data: params
        })


        promise.then(res => {


            resolve(res);
        })
    })
}