module.exports = {
    
    //代练项目
    game(options) {
        
        if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'mocktest') {
            
            options.url = `http://47.96.17.248:8764${options.url}`
        }

        if(process.env.NODE_ENV === 'production') {

            options.url = `http://118.190.68.17:8764${options.url}`
        }
    }
}