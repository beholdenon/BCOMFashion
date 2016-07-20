$(document).ready(function($) {
	'use strict';
	var categoryID="fall16_100percent"; 
	var ismobile = (mobileAndTabletcheck() ? "mbl:" : "");
	window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

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

    $('[coremetricTag]').click(function() {
        coreTag('Element', categoryID, $( this ).attr( "coremetricTag" ));
    });


	function mobileAndTabletcheck () {
        //return ($("footer").css("text-align") === "center" );
		//return 'ontouchstart' in window;
        return ( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );

	}


	$(window).load( function() {
    	coreTag('Pageview', categoryID, 'fall16_100percent--coming_soon');	
	}); 

});