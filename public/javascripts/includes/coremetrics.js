'use strict';

define([
    'underscore',
    'jquery'
], function(_, $) {

    function setEnvironment() {
        if (window.Globals.env === 'dev') {
            return cmSetTest(); // jshint ignore:line
        } else if (window.Globals.env === 'prod') {
            return cmSetProduction(); // jshint ignore:line
        } else {
            throw 'ERROR: unidentified env variable';
        }
    }

    function pageName() {
        //return the last segment of the page URL to be used as an pageview CM id
        var path = window.location.pathname.split('/');

        return path[path.length - 2];
    }

    function pageViewTag (pageID, catID, attr){
        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

        window.BLOOMIES.coremetrics.pageViewExploreAttributes.append({
            42: attr
        });

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
        var pageID = 'fashion_' + pageName(),
            catID = categoryID || 'xx-xx-xx-xx',
            attr = '';
        
        //populate the Globals ns
        window.Globals.Coremetrics.pageID = pageID;
        window.Globals.Coremetrics.catID = catID;

        if (window.BLOOMIES && window.BLOOMIES.coremetrics) {
            setEnvironment();

            if ($(window).width() < 980 && !$('body').children().hasClass('mobile')){
                attr = 'Desktop Minimized';
            } else {
                attr = '';
            }

            window.Globals.Coremetrics.attr42 = attr;

            return pageViewTag(pageID, catID, attr);
        }
    }

    return {
        initCoreMetrics: initCoreMetrics,
        pageViewTag: pageViewTag,
        elementTag: elementTag,
        linkClickTag: linkClickTag
    };
});
