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
                            "2017-glowhaus": "fall17_glowhaus--landing",
                                    "about": "fall17_glowhaus--about",
     "discover-new-makeup-skin-care-brands": "fall17_glowhaus--brands",
                   "makeup-looks-tutorials": "fall17_glowhaus--video"
                  };

    $.fn.currentPageName = function() {
        var pathname = window.location.pathname;
        var res = pathname.split("/");
        if( res[res.length-1] === "" ) return res[res.length-2];
        else return res[res.length-1];
    };



    $.fn.coreTag = function(tagType, pageID) {

        //var thisCategoryID = "fall17_100percent";
        var thisCategoryID = "fall17_glowhaus";

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
            $.fn.trace('###### CoreM Element; thisCategoryID: ' + hasMBL+ thisCategoryID + '; pageID: ' +hasMBL+ pageID.substring(0, 49));
        }
    };

    $.fn.trace = function(log) {
        if (window.location.href.indexOf('www.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };


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
    initCoreMetrics();

    $( window ).on('load', function(){

        $.fn.coreTag('Pageview', pageDict[$.fn.currentPageName()] );

        $('[coremetricTag]').click(function() {
            $.fn.coreTag('Element', $( this ).attr( "coremetricTag" ));
        });

    });    

});


