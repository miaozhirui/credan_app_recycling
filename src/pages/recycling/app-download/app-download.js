import { utils } from 'kld';

const page = {

    data() {

        return {

        }
    },

    methods: {
        
        downloadApp(){

            if(utils.isIphone()) {

                location.href = "https://www.pgyer.com/Efcj";
            } else {

                location.href = "https://www.pgyer.com/CPcD";
            }
        }
    }
}

