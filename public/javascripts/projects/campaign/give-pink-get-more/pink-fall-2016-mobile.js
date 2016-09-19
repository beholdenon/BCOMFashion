/* globals SERVICES */
'use strict';

var PINK = {

	cm: {
		category: 'mbl:fall16-pinkmicrosite',
	},

	coremetrics: function (tagType, categoryID, pageID, attributes) {
        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
            } catch (e) {
                PINK.logErr('CoreM_err: ' + e);
            }
            PINK.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID, attributes || null );
            } catch (e) {
                PINK.logErr('CoreM_err: ' + e);
            }

            PINK.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
        }
    },

    logErr: function (log) {
        //log errors only on DEV mode
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    },
};

$(window).load(function() {
	PINK.coremetrics('Pageview', PINK.cm.category, PINK.cm.category );
});

$(document).ready(function() {
	// PINK.updateShop(PINK.products);

	SERVICES.brightCove.getURL(function(res){
		$('#stories').attr('src', res);
	}, 5124807676001 );

	$('#stories').on('click', function () {
		$(this)[0].play();
	});

	$("#backToTop").on("click tap", function () {
		$('html, body').animate({
	        scrollTop: 0
	    }, 'slow');
	});

	// COREMETRICS



});