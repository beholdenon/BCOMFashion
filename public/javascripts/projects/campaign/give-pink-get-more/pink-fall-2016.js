/* globals SERVICES, Hammer */
'use strict';

var PINK = {

	cm: {
		category: 'fall16-pinkmicrosite',
	},
	tags: [],

	getNext: function (arrow) {
		var pos = $('#doctors .active').index('#doctors > li');

		if ( arrow.hasClass('arrowR') && pos >= $('#doctors > li').length-1 ) {
			pos = 0;
		} else if ( arrow.hasClass('arrowL') && pos <= 0 ) {
			pos =  $('#doctors > li').length-1;
		} else if ( arrow.hasClass('arrowR') ) {
			pos++;
		} else {
			pos--;
		}

		return $('#doctors > li').eq(pos);
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

	// Video Call from BrightCove API
	SERVICES.brightCove.getURL(function(res){
		$('#stories').attr('src', res);
	}, 5124807676001 );

	// Play video on poster click -- REMOVED DUE TO FIREFOX ISSUE
	// $('#stories').on('click', function () {
	// 	$(this)[0].play();
	// });

	// back to top button
	$("#backToTop").on("click tap", function () {
		$('html, body').animate({
	        scrollTop: 0
	    }, 'slow');
	});

	var fixedOffset = 150;

	// Navigation

	setTimeout( function () {
		fixedOffset = $('header.responsive').height();
		
		if ( $(document).scrollTop() >= fixedOffset) {
			$('#pinkNav').removeAttr('style');
			$('#pinkNav').css('height', 0);
			$('#pinkNav').addClass('fixed');
			$('html, body').animate({
		        scrollTop: $(document).scrollTop() + 1
		    }, 300);
			$('#pinkNav').animate({height: '5.5em'}, 500);
			
		} else {
			$('#pinkNav').removeClass('fixed');
			$('#pinkNav').css('top', fixedOffset);
		}

	}, 3000);

	$(document).scroll( function() {

		var scrolled = $(window).scrollTop() + $(window).height();

		if ($(document).scrollTop() >= fixedOffset) {
			$('#pinkNav').removeAttr('style');
			$('#pinkNav').addClass('fixed');
		} else {
			$('#pinkNav').removeClass('fixed');
			$('#pinkNav').css('top', fixedOffset);
		}

        $('section').each(function() {
        	var section = $(this);

            if ( section.is(':visible') && section.attr('id') !== undefined && PINK.tags.indexOf( section.attr('id') ) < 0 ) {
            	if ( scrolled > section.offset().top + $(window).height() * 0.4 ) {
	                PINK.tags = [];
	                PINK.tags.push( section.attr('id') );
	                $('#pinkNav li').removeClass('active');
	                $("[data-target=" + section.attr('id') + "]").addClass('active');

	                PINK.coremetrics('Pageview', PINK.cm.category, PINK.cm.category + '_' + section.attr('id'));
	            }
            }
        });

	});

	$('#pinkNav li').on('click tap', function () {
		var goTo = $(this).attr('data-target'),
			loc = $('#'+goTo).offset().top - $('#pinkNav').height() - $('#Im-Still-Me img.heading').height() - $(window).height()*0.1 ;

		$('html, body').animate({
	        scrollTop: loc
	    }, 'slow');

	});

	// Slideshow navigation
	var sellerSwipe = new Hammer( document.getElementById('doctors') );
	sellerSwipe.on('swipe', function(ev) {
		//Hammer.js: left = 2, right = 4
		if ( ev.direction === 2 ) {
			$(".arrowR").trigger('click');
		} else if ( ev.direction === 4) {
			$(".arrowL").trigger('click');
		}
	});

	$('.arrow').on('click', function () {
		var arrow = $(this),
			activeElem = $('#doctors > li.active'),
			nextElem = PINK.getNext(arrow),
			direction = 1;
			// distance = $('#doctors').width();

		if ( arrow.hasClass('arrowR') ) {
			direction = -1;
		}

		activeElem.removeClass('active').hide();
		nextElem.addClass('active').show();
		$('#doctorDots li').eq( $('#doctors .active').index('#doctors > li') ).addClass('active').siblings().removeClass('active');
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