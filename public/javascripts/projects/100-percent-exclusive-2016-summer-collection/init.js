$(document).ready(function($) {
	'use strict';

	var categoryID="fall16_100percent"; 
	var ismobile = (mobileAndTabletcheck() ? "mbl:" : "");

    $(window).load( function() {
        coreTag('Pageview', categoryID, 'fall16_100percent--coming_soon');  
    });  

    $('[coremetricTag]').click(function() {
        coreTag('Element', categoryID, $( this ).attr( "coremetricTag" ));
    });

    $('#shop_bloomingdales').click(function(){
        coreTag('Element', categoryID, $( this ).attr( "id" ));
        window.location.href = "http://www.bloomingdales.com/";
    });

	function mobileAndTabletcheck () {
        //return ($("footer").css("text-align") === "center" );
		//return 'ontouchstart' in window;
        return ( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
	}

    function coreTag (tagType, categoryID, pageID) {
        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(ismobile+pageID, ismobile+categoryID, '', '');        
            } catch (e) {
                trace('CoreM_err: ' + e);
            }
            trace('###### CoreM Pageview; categoryID: ' +ismobile+ categoryID + '; pageID: ' +ismobile+ pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(ismobile+pageID.substring(0, 49), ismobile+categoryID);
            } catch (e) {
                trace('CoreM_err: ' + e);
            }
            trace('###### CoreM Element; categoryID: ' +ismobile+ categoryID + '; pageID: ' +ismobile+ pageID.substring(0, 49));            
        }
    }

    function trace (log) {
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
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

    initCoreMetrics();

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