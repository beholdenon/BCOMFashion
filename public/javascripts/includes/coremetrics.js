'use strict'; 

define([
    'underscore',
    'jquery',
    'globalns'
], function(_, $) {
    
    var isMobile = (function () {
        return ( $('.bl_mobile')[0] ) ? true : false;
    })(),
        mblTagPrefix = 'mbl:';


    function prependMobilePrefix(attribute) {
        if (isMobile) {
            return mblTagPrefix + ' ' + (
                    attribute.toLowerCase().indexOf(mblTagPrefix) > -1 ?
                        attribute.substring(mblTagPrefix.length) : attribute
                ).trim();
        } 
        return attribute;
    }
    
    function pageName() {
        //return the last segment of the page URL to be used as an pageview CM id
        var path = window.location.pathname.split('/');

        return path[path.length - 2];
    }
    
    function setEnvironment() {
        if (window.location.host === 'fashion.bloomingdales.com' || window.location.host === 'bloomingdales.com'){
            return cmSetProduction(); // jshint ignore:line
        } else {
            return cmSetTest(); // jshint ignore:line
        }
    }

    function pageViewTag (pageID, catID, attrID, attrData){
        pageID = prependMobilePrefix(pageID);
        catID = prependMobilePrefix(catID);

        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

        var attr = parseInt(attrID);
        var dataAttr = {};
        dataAttr[attr] = attrData;

        window.BLOOMIES.coremetrics.pageViewExploreAttributes.append(dataAttr);

        window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, catID, '', '');        
    }

    function elementTag(element) {
        // Prepend 'mobl' to both ID and elementCategory
        element.elementID = prependMobilePrefix(element.elementID);
        element.elementCategory = prependMobilePrefix(element.elementCategory);
        
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

            // return pageViewTag(pageID, catID, '42', attr); //---default pageview tag firing on every view

            // coremetrics data might have been added by handlebars directive, check and initialize if so
            var cmDataEl = $('#cmdata')[0];
            if (cmDataEl) {
                var categoryId = prependMobilePrefix(cmDataEl.dataset.categoryid);
                var pageId = prependMobilePrefix(cmDataEl.dataset.pageid);
                
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageId, categoryId);
                
                // also check if elements have been marked with cm data, is so
                $("a[data-cm]").on('click', function () {
                    var attrCm = prependMobilePrefix( $(this).data('cm') );
                    
                    if (typeof attrCm === 'string' && attrCm.length > 0) {
                        window.BLOOMIES.coremetrics.cmCreatePageElementTag(attrCm, categoryId);
                    }
                });
            }
        }
    }

    return {
        initCoreMetrics: initCoreMetrics,
        pageViewTag: pageViewTag,
        elementTag: elementTag,
        linkClickTag: linkClickTag,
        prependMobilePrefix: prependMobilePrefix
    };
});
