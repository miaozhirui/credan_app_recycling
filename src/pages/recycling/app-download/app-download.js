import { utils } from 'kld';

const page = {

    data() {

        return {

        }
    },

    methods: {
        
        downloadApp(){

            if(utils.isIphone()) {

                location.href = "";
            } else {

                location.href = "https://www.pgyer.com/E1cZ";
            }
        }
    }
}

