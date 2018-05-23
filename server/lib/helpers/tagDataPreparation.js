'use strict';

var prepareTagData = {};
prepareTagData.getUtagData = function(req) {
    var tagUrls = require('../data/static/categoryurls.json').tagUrls,
        urlsLength = tagUrls.length,
        utagObj = {};
    for(var i=0; i<urlsLength; i++){
        var obj = tagUrls[i];

        if(obj.url.indexOf(req.path) !== -1){
            utagObj.pageType = obj.pageType;
            if (obj.pageName)
                utagObj.pageName = obj.pageName;
            break;
        }

    }

    return utagObj;
};

module.exports = prepareTagData;