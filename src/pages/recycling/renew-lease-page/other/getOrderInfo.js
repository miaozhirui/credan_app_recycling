import { utils } from 'kld'
import storage from 'good-storage';

export default data => {

    return new Promise((resolve, reject) => {

         let putOffDays = data.day;
         let planId = storage.get('planId');

         let params = {

            putOffDays,
            planId
         }
        
        let promise = utils.fetch({

            url: '/wx/v16/putOffFee',
            data: params
        })


        promise.then(res => {

            resolve(res);
        })
    })
}