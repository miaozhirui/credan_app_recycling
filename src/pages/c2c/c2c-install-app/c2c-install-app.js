import { utils } from 'kld';

const page = {

    data() {

        return {
        
            installLink: ''   
        }
    },

    created() {
        
        this.installLink = /iphone/ig.test(navigator.userAgent) ? 'https://www.pgyer.com/bKEV' : 'https://www.pgyer.com/E1cZ'
    },

    methods: {
        
    }
}

