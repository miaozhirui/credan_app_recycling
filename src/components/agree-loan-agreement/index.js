import { utils } from 'kld';
import agreement from './agreement.js';

export default {
    
    props:{
        agreement:{

            type:String,
            required:true
        },
        isShowAgreement: {

            type:Boolean,
            required: true
        }
    },

    methods: {

        agree() {

          this.$emit('watchIsAgree');
        },

        toWithholdingAgreement() {

            this.isShow = true;
        },

        cancelHandle() {

            this.$emit('watchIsShow', false)
        }

    }
}