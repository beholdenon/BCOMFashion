'use strict';

var prepareTagData = {};
prepareTagData.getPageType = function(req) {
    var tagUrls = require('../data/static/category-urls.json').tagUrls,
        urlsLength = tagUrls.length,
        pageType = "";
    for(var i=0; i<urlsLength; i++){
        var obj = tagUrls[i];

        if(obj.url.indexOf(req.path) !== -1){
            pageType = obj.pageType;
        }

    }

    return pageType;
};

module.exports = prepareTagData;