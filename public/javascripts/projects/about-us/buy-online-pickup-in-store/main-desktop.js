(function() {
    'use strict';

    var categoryID = 'Ways_to_Shop',
        pageID = 'bops';

    window.onload = function() {
        window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
    };   
}());