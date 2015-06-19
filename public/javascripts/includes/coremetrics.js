define([
    'underscore',
    'jquery'
], function(_, $) {

    'use strict';

    function setEnvironment() {
        Globals.env = 'dev';

        if (Globals.env === 'dev') {
            return cmSetTest();
        } else if (Globals.env === 'production') {
            return cmSetProduction();
        } else {
            throw 'ERROR: unidentified env variable'
        }
    };

    function pageName() {
        //return the last segment of the page URL to be used as an pageview CM id
        var path = window.location.pathname.split('/')

        return path[path.length - 2];
    };

    function pageViewTag (pageID, catID, attr){
        BLOOMIES.coremetrics.pageViewExploreAttributes = new BLOOMIES.coremetrics.exploreAttributes();

        BLOOMIES.coremetrics.pageViewExploreAttributes.append({
            42: attr
        });

        BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, catID, '', '');        
    }

    function elementTag(element) {
        return window.cmCreatePageElementTag(element.elementID, element.elementCategory, element.attributes || null);
    }

    function linkClickTag(element) {
        var $elem = $(element),
            href = $elem.attr('href') || window.document.location.href;

        return window.cmCreateManualLinkClickTag(href);
    }

    function initCoreMetrics(categoryID) {
        var pageID = 'fashion_' + pageName(),
            catID = categoryID || 'xx-xx-xx-xx',
            attr = '';
        
        //populate the Globals ns
        Globals.pageID = pageID;
        Globals.catID = catID;
        Globals.coremetrics = {};

        if (BLOOMIES && BLOOMIES.coremetrics) {
            new setEnvironment();

            if ($(window).width() < 980 && !$('body').children().hasClass('mobile')){
                attr = 'Desktop Minimized';
            } else {
                attr = ''
            }

            Globals.coremetrics.attr_42 = attr;

            return pageViewTag(pageID, catID, attr);
        }
    };

    return {
        initCoreMetrics: initCoreMetrics,
        pageViewTag: pageViewTag,
        elementTag: elementTag,
        linkClickTag: linkClickTag
    }
});
