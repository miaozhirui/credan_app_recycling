import { utils } from 'kld';

export default () => {


    let thisAppVersion = 1;

    let promise = utils.fetch({
        
        method: 'get',
        url: 'https://app1.credan.com/app/hots/origin_app/chcp.json',
        loadingTip: false,
        isNeedIdentity:false
    })

    promise.then(data => {

        let releaseVersion = data.release;
        
        //如果不相等，说明显示的版本新于用户本地的版本，需要用户去更新
        if(thisAppVersion != releaseVersion) {

            $confirm.show({

                content: '爱回购app更新啦，请前往下载',

            }).then(res => {
                
                if(res) {
                    
                    cordova.plugins.ToSafari.toSafari('http://www.wangluodaikuankouzi.com/recycling/pages/aiguigou-download.html');
                }

            })
        }
    })
}