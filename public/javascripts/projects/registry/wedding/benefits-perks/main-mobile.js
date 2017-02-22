/**
 * Created by Leonardo Brandao on 10/03/16.
 */

'use strict';

require([
    'jquery',
    'coremetrics',
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
			
			var elementCM = {},
				vid = '';

			APP.videoPlayer[0].src = APP.projectAssets + $(this).data('video-src');
			APP.videoPlayer[0].dataset.name =  $(this).data('video-name');

			$('#registry-bp-videoModal, #registry-bp-maskLayout').show();

			vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-0-_-"+Math.round($(this)[0].duration);
	     
			elementCM.elementID = APP.videoPlayer[0].dataset.name;
			elementCM.elementCategory = APP.cm;
			elementCM.attributes = vid;
	     	Coremetrics.elementTag( elementCM );

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

			var elementCM = {};

			$('#registry-bp-videoModal, #registry-bp-maskLayout').hide();
			
			APP.videoPlayer[0].currentTime = 0;
			APP.videoPlayer[0].pause();

			elementCM.elementID = APP.videoPlayer[0].dataset.name.replace('play', 'close');
			elementCM.elementCategory = APP.cm;

			Coremetrics.elementTag( elementCM );
		});

		$( APP.videoPlayer ).on('ended',function() {
			var elementCM = {},
				vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-3-_-"+Math.round($(this)[0].duration);
	        
	        elementCM.elementID = APP.videoPlayer[0].dataset.name;
			elementCM.elementCategory = APP.cm;
			elementCM.attributes = vid;
	     	Coremetrics.elementTag( elementCM );

	        $('#registry-bp-videoModal, #registry-bp-maskLayout').hide();
	    });

	    $( APP.videoPlayer ).on("play", function () {
	    	var elementCM = {},
	    		vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-1-_-"+Math.round($(this)[0].duration);
	    	
	    	elementCM.elementID = APP.videoPlayer[0].dataset.name;
			elementCM.elementCategory = APP.cm;
			elementCM.attributes = vid;
	     	Coremetrics.elementTag( elementCM );

	    });

	    $( APP.videoPlayer ).on("pause", function () {
	    	if ( $(this)[0].ended !== true && $(this)[0].currentTime > 0 ) {
	    		var elementCM = {},
	    			vid = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-2-_-"+Math.round($(this)[0].duration);
	    		
	    		elementCM.elementID = APP.videoPlayer[0].dataset.name;
				elementCM.elementCategory = APP.cm;
				elementCM.attributes = vid;
		     	Coremetrics.elementTag( elementCM );

	    	}
	    });
	};

	$(window).load(function() {
		APP.init();
	});

});
