'use strict'; 

define([
    'underscore',
    'jquery'
], function(_, $) {

    function setEnvironment() {
        if (window.Globals.env === 'dev') {
            return cmSetTest(); // jshint ignore:line
        } else if (window.Globals.env === 'production') {
            if (window.location.host === 'fashion.bloomingdales.com'){
                return cmSetProduction(); // jshint ignore:line
            } else {
                return cmSetTest(); // jshint ignore:line
            }
        } else {
            throw 'ERROR: unidentified env variable';
        }
    }

    function pageName() {
        //return the last segment of the page URL to be used as an pageview CM id
        var path = window.location.pathname.split('/');

        return path[path.length - 2];
    }

    function pageViewTag (pageID, catID, attrID, attrData){
        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

        var attr = parseInt(attrID);
        var dataAttr = {};
        dataAttr[attr] = attrData;

        window.BLOOMIES.coremetrics.pageViewExploreAttributes.append(dataAttr);

        window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, catID, '', '');        
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
        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();
        
        var pageID = 'fashion_' + pageName(),
            catID = categoryID || 'xx-xx-xx-xx',
            attr = '';
        
        //populate the Globals ns
        window.Globals.Coremetrics.pageID = pageID;
        window.Globals.Coremetrics.catID = catID;

        if (window.BLOOMIES && window.BLOOMIES.coremetrics) {
            setEnvironment();

            if ($(window).width() < 980 && window.Globals.deviceType !== 'mobile'){
                attr = 'Desktop Minimized';
            } else {
                attr = '';
            }

            window.Globals.Coremetrics.attr42 = attr;

            // return pageViewTag(pageID, catID, '42', attr); ---default pageview tag firing on every view
        }
    }

    return {
        initCoreMetrics: initCoreMetrics,
        pageViewTag: pageViewTag,
        elementTag: elementTag,
        linkClickTag: linkClickTag
    };
});
