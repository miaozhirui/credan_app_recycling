import { utils } from 'kld';

const page = {

    data() {

        return {
        
        }
    },

    created(){

        this.channelId = 1; 

        utils.addEvent('app下载页面到达');
    },

    methods: {
         //去下载ios
        toDownloadIos() {
            
            // let url = `itms-services://?action=download-manifest&url=https://app1.credan.com/app/packages/aihuigou/package${this.channelId}/manifest.plist`;
            let url = `itms-services://?action=download-manifest&url=https://crestatic.oss-cn-hangzhou.aliyuncs.com/ipa/manifest.plist`;
            

            location.href = url;
        },
        
        //去下载android
        toDownloadAndroid() {
            
            let url = `https://app1.credan.com/app/packages/aihuigou/package${this.channelId}/android.apk`;


            location.href = url;
        }
    }
}

