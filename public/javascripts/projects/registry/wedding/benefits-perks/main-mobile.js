/**
 * Created by Leonardo Brandao on 10/03/16.
 */

'use strict';

require([
    'jquery',
    'bcomCoremetrics',
], function($, Coremetrics) {

	var APP = {
		cm: 'MBL:BWEDD_Registry_Home',
		cmElementCat: 'BWEDD_WHY_REGISTER',
		videoPlayer: $('#registry-bp-video'),
		projectAssets: '/b/fashion/images/projects/registry/wedding/benefits-perks/'
	};

	APP.init = function () {
		var self = this,
			videoModal = $('#registry-bp-videoModal'),
			videoOverlay = $('#registry-bp-maskLayout');

		videoModal.remove();
		videoOverlay.remove();

		$( 'body ').append( videoModal );
		$( 'body ').append( videoOverlay );

		self.listeners();

		Coremetrics.pageViewTag( 'mbl:BWEDD_Why_Register', self.cm );
	};

	APP.listeners = function () {
		$('.registry-bp-back-to-top-button').on('click', function ( event ){

			event.preventDefault();
			event.stopPropagation();

			var elementCM = {
				elementID: 'mbl: back-to-top',
				elementCategory: APP.cm
			};

			$('html, body').animate({
	            scrollTop: 0
	        }, 'slow' );

	        Coremetrics.elementTag(elementCM);

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

			if (APP.videoPlayer[0].requestFullscreen) {
		      APP.videoPlayer[0].requestFullscreen();
		    } else if (APP.videoPlayer[0].mozRequestFullScreen) {
		      APP.videoPlayer[0].mozRequestFullScreen();
		    } else if (APP.videoPlayer[0].webkitRequestFullscreen) {
		      APP.videoPlayer[0].webkitRequestFullscreen();
		    }

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

	     	if (APP.videoPlayer[0].exitFullscreen) {
		      APP.videoPlayer[0].exitFullscreen();
		    } else if (APP.videoPlayer[0].mozExitFullScreen) {
		      APP.videoPlayer[0].mozExitFullScreen();
		    } else if (APP.videoPlayer[0].webkitExitFullscreen) {
		      APP.videoPlayer[0].webkitExitFullscreen();
		    }

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
