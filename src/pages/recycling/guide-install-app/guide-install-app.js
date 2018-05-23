import { utils } from 'kld';

const page = {

    data() {

        return {
            
            isIphoneGuide: true
        }
    },

    created() {
        
        
        if(!utils.isIphone()) {

            isIphoneGuide = false;
        }
    },

    methods: {
        
    }
}

