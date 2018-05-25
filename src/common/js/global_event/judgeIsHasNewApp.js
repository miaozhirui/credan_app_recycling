import { utils } from 'kld';
import appSettings from 'pages/zcommon/appSettings';

export default () => {

    
    let localAppVersion = appSettings.appVersion;

    let promise = utils.fetch({
        
        method: 'get',
        url: 'https://app1.credan.com/app/hots/origin_app/chcp.json',
        loadingTip: false,
        isNeedIdentity:false
    })

    promise.then(data => {

        let releaseVersion = data.release;
        
        //如果线上版本大于用户本地的版本的话，需要用户去更新的
        // if(thisAppVersion != releaseVersion) {
        if(releaseVersion > localAppVersion){

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