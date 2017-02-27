/**
 * Created by Leonardo Brandao on 10/03/16.
 */

'use strict';

require([
    'jquery',
    'bcomCoremetrics',
], function($, Coremetrics) {

	var APP = {
		cm: 'BWEDD_Registry_Home',
		cmElementCat: 'BWEDD_WHY_REGISTER',
		videoPlayer: $('#registry-bp-video'),
		projectAssets: '/b/fashion/images/projects/registry/wedding/benefits-perks/'
	};

	APP.init = function () {
		var self = this;

		self.listeners();

		Coremetrics.pageViewTag( 'BWEDD_Why_Register', self.cm );
	};

	APP.listeners = function () {
		$('.registry-bp-hero-link').on('click', function ( event ){
			
			event.preventDefault();
			
			var target = $( this ).attr( 'href' );

			$('html, body').animate({
	            scrollTop: $( target ).offset().top
	        }, 'slow' );

	        Coremetrics.elementTag({
	        	elementID: target.substring(1),
				elementCategory: APP.cmElementCat
	        });
		});

		$('.registry-bp-play-btn').on('click', function ( event ) {
			event.preventDefault();			

			APP.videoPlayer[0].src = APP.projectAssets + $(this).data('video-src');
			APP.videoPlayer[0].dataset.name =  $(this).data('video-name');

			$('#registry-bp-videoModal, #registry-bp-maskLayout').show();

			var vid = Coremetrics.attributes({ 
				16: '0',
				17: Math.round($(this)[0].duration)
			});
	     
	     	Coremetrics.elementTag( {
	     		elementID: APP.videoPlayer[0].dataset.name,
				elementCategory: APP.cm,
				attributes: vid
	     	} );

			APP.videoPlayer[0].play();

		});
		$('#registry-bp-closeModal').on('click', function ( event ) {
			event.preventDefault();

			$('#registry-bp-videoModal, #registry-bp-maskLayout').hide();
			
			APP.videoPlayer[0].currentTime = 0;
			APP.videoPlayer[0].pause();

			Coremetrics.elementTag( {
				elementID: APP.videoPlayer[0].dataset.name.replace('play', 'close'),
				elementCategory: APP.cm
			} );
		});

		$( APP.videoPlayer ).on('ended',function() {
			var vid = Coremetrics.attributes({ 
				16: '3',
				17: Math.round($(this)[0].duration)
			});
	        
	     	Coremetrics.elementTag( {
		     	elementID: APP.videoPlayer[0].dataset.name,
				elementCategory: APP.cm,
				attributes: vid
		} );

	        $('#registry-bp-videoModal, #registry-bp-maskLayout').hide();
	    });

	    $( APP.videoPlayer ).on("play", function () {
	    	var vid = Coremetrics.attributes({ 
				16: '1',
				17: Math.round($(this)[0].duration)
			});
	    	
	     	Coremetrics.elementTag( {
	     		elementID: APP.videoPlayer[0].dataset.name,
				elementCategory: APP.cm,
				attributes: vid
	     	} );

	    });

	    $( APP.videoPlayer ).on("pause", function () {
	    	if ( $(this)[0].ended !== true && $(this)[0].currentTime > 0 ) {
	    		var vid = Coremetrics.attributes({ 
				16: '2',
				17: Math.round($(this)[0].duration)
			});
	    		
		     	Coremetrics.elementTag( {
		     		elementID: APP.videoPlayer[0].dataset.name,
					elementCategory: APP.cm,
					attributes: vid
		     	} );

	    	}
	    });
	};

	$(window).load(function() {
		APP.init();
	});

});
