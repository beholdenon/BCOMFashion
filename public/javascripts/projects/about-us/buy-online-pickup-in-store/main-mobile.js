(function() {
    'use strict';

    var categoryID = 'mbl:Ways_to_Shop',
        pageID = 'mbl:bops';

    window.onload = function() {
        window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
    };   
}());