$(document).ready( function($) {


    'use strict';

    $( "html" ).attr({
        lang: "en"
    });

    var hasMBL = (isDevice2() ? "mbl:" : "");

    function isDevice2 () {
        return ( window.innerWidth <= 600 );
    }

    // init global app namespace object
    window.Globals = {
        env: window.ENV_CONFIG || 'dev',
        deviceType: null,
        mobileOS: window.MOBILE_OS,
        Coremetrics: {
            pageID: null,
            catID: null,
            attr42: null
        }
    };

    var pageDict = {
                           /// "spring18_resort": "spring18_resort--landing",
                                    "florals": "spring18_resort--Florals",
                                    "stripes": "spring18_resort--Stripes",
                                     "ruffle": "spring18_resort--Ruffle",
                                       "swim": "spring18_resort--Swim"
                  };


    var thisCategoryID = "spring18_resort";
    
    $.fn.currentPageName = function() {
        var pathname = window.location.pathname;
        var res = pathname.split("/");
        if( res[res.length-1] === "" ) return res[res.length-2];
        else return res[res.length-1];
    };


    //-----

    var parseQueryString = function(url) {
        var urlParams = {};
        url.replace(
            new RegExp("([^?=&]+)(=([^&]*))?", "g"),
            function($0, $1, $2, $3) {
                urlParams[$1] = $3;
            }
        );

        return urlParams;
    };

    //-----
    $( window ).load(function() {

        //$.fn.coreTag('Pageview', pageDict[$.fn.currentPageName()] );

        // resort-aside-nav-item (nav items) going to fire coremetrics on scroll-end not on click
        $('[coremetricTag]').not( '.resort-aside-nav-item' ).click(function() {

            var item = $( this );

            // var qwe = item.hasClass('resort-footer-social-link');
            var el = item.attr("coremetricTag");
            var page = '';
            
            var isSocialLinks = item.hasClass('resort-footer-social-link');
            var isBack2topBtn = item.hasClass('resort-back-to-top-btn');
            var isScrollDownBtn = item.hasClass('resort-scroll-down-btn');
            
            
            if (!isSocialLinks && !isScrollDownBtn && !isBack2topBtn) {
                var urlToParse = item.attr('href').toLowerCase();
                var result = parseQueryString(urlToParse);
                console.log(JSON.stringify(result));

                if (item.closest('.resort-page').length) {
                    page = item.closest('.resort-page').attr('id').toUpperCase();
                }

                $.fn.coreTag('Element', page + '__' + el + '__ID-' + result.id);
                
            } else if (isSocialLinks) {
                $.fn.coreTag('Element', 'footer-social-link__' + el);
            } else if (isBack2topBtn || isScrollDownBtn){
                $.fn.coreTag('Element', 'fast-scroll-link__' + el);
            }

            
        });
        
        $('.resort-aside-nav-item').not( '.resort-external-link' ).click(function() {

            $.fn.coreTag('Element', $( this ).attr( "coremetricTag" ));

        });
        
        /*
        $.fn.coreTag('Pageview', pageDict[$.fn.currentPageName()] );

        $('[coremetricTag]').click(function() {
            $.fn.coreTag('Element', $( this ).attr( "coremetricTag" ));
        });
        
        */

    });

    $.fn.coreTag = function(tagType, pageID) {

        //var thisCategoryID = "fall17_100percent";
        

        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(hasMBL+pageID, hasMBL+thisCategoryID, '', '');
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Pageview; thisCategoryID: ' +hasMBL + thisCategoryID + '; pageID: ' +hasMBL+ pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + pageID.substring(0, 49), hasMBL+thisCategoryID);
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            ////  $.fn.trace('###### CoreM Element; thisCategoryID: ' + hasMBL+ thisCategoryID + '; pageID: ' +hasMBL+ pageID.substring(0, 49));
            $.fn.trace('###### CoreM Element; thisCategoryID: ' + hasMBL+ thisCategoryID + '; pageID: ' +hasMBL+ pageID);
        }
    };

    $.fn.trace = function(log) {
        if (window.location.href.indexOf('www.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };

    initCoreMetrics();

    function setEnvironment() {
        if (window.Globals.env === 'dev') {
            return cmSetTest(); // jshint ignore:line
        } else if (window.Globals.env === 'production') {
            if (window.location.host === 'www.bloomingdales.com'){
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
        }
    }

});
