var path = require('path');
var fs = require('fs');


module.exports = function(app) {
    
    var pageDir = path.join(__dirname, '../pages', process.env.NODE_ENV) ;
   
   
    var parentPages = fs.readdirSync(pageDir);
    var allPages = [];

    parentPages.forEach(function(item) {

        var stat = fs.statSync(path.join(pageDir, item));

        if (stat.isDirectory()) {

            var childPages = fs.readdirSync(path.join(pageDir, item));

            childPages = childPages.map(function(child) {

                return path.join(pageDir, item, child);
            })
            
            allPages = allPages.concat(childPages);
        }

    })
    // console.log(parentPages);
    //去掉非目录的文件
    allPages = allPages.filter(function(item) {

        var stat = fs.statSync(item);

        if(stat.isDirectory()) return true;

    })

    allPages.filter(function(item){

        var stat = fs.statSync(item);

        if(stat.isDirectory()){

            var mockDataFile = path.join(item, 'index.js');

            var fileIsExist = fs.existsSync(mockDataFile);
            
            if(fileIsExist) {

                var mockData = require(mockDataFile);
               
                for(let i in mockData){
                   
                    app.all(i, mockData[i]);
                }
            }
        }
    })
}