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

	$("#backToTop").on("click tap", function () {
		$('html, body').animate({
	        scrollTop: 0
	    }, 'slow');
	});

	// COREMETRICS

	$("[data-element]").on("click", function () {

		if ( $(this)[0].hasAttribute('data-attribute') ) {
			var attr = $(this).attr('data-attribute'),
				attrNum = attr.substring(0, attr.indexOf(':')),
				attrVal = attr.substring(attr.indexOf(':')+1);

			for ( var i= parseInt(attrNum); i > 1; i-- ) {
				attrVal = '-_-' + attrVal;
			}

			PINK.coremetrics('Element', PINK.cm.category, $(this).attr("data-element").slice(0, 50), attrVal );
		} else {
			PINK.coremetrics('Element', PINK.cm.category, $(this).attr("data-element").slice(0, 50) );
		}
		
	});

	$("video").on("play", function() {
		var attrNum = 16,
			attrVal = 2;

		for ( var i= parseInt(attrNum); i > 1; i-- ) {
			attrVal = '-_-' + attrVal;
		}

		PINK.coremetrics('Element', PINK.cm.category, $(this).attr("data-video"), attrVal );
	});

	$('video').on('ended',function(){
		var attrNum = 16,
			attrVal = 3;

		for ( var i= parseInt(attrNum); i > 1; i-- ) {
			attrVal = '-_-' + attrVal;
		}
			
		PINK.coremetrics('Element', PINK.cm.category, $(this).attr("data-video"), attrVal );
	});

	$("video").on("pause", function() {
		var attrNum = 16,
			attrVal = 1;

		for ( var i= parseInt(attrNum); i > 1; i-- ) {
			attrVal = '-_-' + attrVal;
		}
			
		PINK.coremetrics('Element', PINK.cm.category, $(this).attr("data-video"), attrVal );
	});

});