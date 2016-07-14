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

	$('#emailSignup').on('click', function () {

		coreTag('Element', categoryID, ismobile+"email_Signup");

	});


	$('.links a').on('click', function () {

        var hash = $(this).attr('href');
        hash = hash.replace('http://www1.bloomingdales.com/shop/', '');
        //hash = hash.split('?')[0];
        //hash = hash.substring(hash.indexOf('/') + 1);
        coreTag('Element', categoryID, 'shop_click_' + hash + '');

	});


	function mobileAndTabletcheck () {
		return 'ontouchstart' in window;
	}


	$(window).load( function() {
    	coreTag('Pageview', categoryID, 'fall16_100percent--coming_soon');	
	}); 

});