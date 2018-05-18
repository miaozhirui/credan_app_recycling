var fs = require('fs');
var path = require('path')

module.exports = function(source) {
    
    var appSource = ''

    if(process.env.NODE_PLATFORM == 'app') {
        
         appSource = fs.readFileSync(path.join(process.cwd(), 'src/common/css/app.less'),'utf-8');
      
    }

    return appSource + source
}