import { validate, utils } from 'kld';
import pullMonster from './pullMonster';

export default {

    props: ['phone','isShowMaster'],
    props:{
        phone:{
            type: String,
            required:true
        },
        isShowMaster:{
            type:Boolean,
            default:true
        },
        isUseDefaultIp:{

            type: Boolean,
            default: true
        }
    },
    
    data() {

        return {

            timerText: '获取验证码',
            company: 's',
            defaultTime: 60,
            isDisable: false

        }
    },

    methods: {

        getCode() {
            
    
            if (this.timerText != '获取验证码') return;
      
            if (validate.isPhone(this.phone)) {

                if (navigator && navigator.onLine === false) {

                    utils.tipInfo({

                        content: '请检查您的网络',
                    })

                } else {

                    this.setCountDown();

                    pullMonster.pull(this.phone, this.isShowMaster, this.isUseDefaultIp);

                }

            } else {

                utils.tipInfo({

                    content: '请输入正确的手机号',
                })
            }

        },

        setCountDown() {

            this.timerText = `${this.defaultTime}${this.company}`;
            this.isDisable = true;

            let timer = setInterval(() => {

                if (this.defaultTime == 0) {

                    this.timerText = '获取验证码';
                    this.defaultTime = 60;
                    clearInterval(timer);
                    this.isDisable = false;

                    let aiframe2 = document.getElementById('aiframe2');

                    if (aiframe2) {

                        aiframe2.parentNode.removeChild(aiframe2);
                    }
                } else {

                    this.timerText = --this.defaultTime + this.company;
                }


            }, 1000)
        }
    }
}