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
		videoPlayer: '',
		projectAssets: '/b/fashion/images/projects/registry/wedding/benefits-perks/',

		fetchVideoData: function ( videoURL, videoPlayer ) {
			var req = new XMLHttpRequest();
			req.open('GET', videoURL, true);
			req.responseType = 'blob';

			req.onload = function() {
			   if (this.status === 200) {
			      var videoBlob = this.response;
			      var vid = URL.createObjectURL(videoBlob); 
			      // Video is now downloaded
			      videoPlayer.src = vid;
			   }
			};
			req.onerror = function(e) {
			   // Error
			   console.log('Something went wrong', e);
			};

			req.send();
		}
	};

	APP.init = function () {
		var self = this;

		self.listeners();

		Coremetrics.pageViewTag( {
			pageId: 'BWEDD_Why_Register', 
			categoryId: self.cm 
		} );
	};

	APP.listeners = function () {
		$('.registry-bp-hero-link').on('click', function ( event ){
			
			event.preventDefault();
			
			var target = $( this ).attr( 'href' );

			$('html, body').animate({
	            scrollTop: $( target ).offset().top
	        }, 'slow' );

	        Coremetrics.elementTag({
	        	elementId: target.substring(1),
				categoryId: APP.cmElementCat
	        });
		});

		$('.registry-bp-play-btn').on('click', function ( event ) {
			event.preventDefault();	

			APP.videoPlayer = $( '#registry-bp-video' + $(this).data('video-player') );

			APP.videoPlayer.show();

			$('#registry-bp-videoModal, #registry-bp-maskLayout').show();

			APP.videoPlayer[0].play();

			var vid = Coremetrics.attributes({ 
				16: '0',
				17: Math.round(APP.videoPlayer[0].duration)
			});
	     	
			console.log(APP.videoPlayer[0].dataset.name);
			console.log(APP.cm);

	     	Coremetrics.elementTag( {
	     		elementId: APP.videoPlayer[0].dataset.name,
				categoryId: APP.cm,
				attributes: vid
	     	} );

		});
		$('#registry-bp-closeModal').on('click', function ( event ) {
			event.preventDefault();

			APP.videoPlayer.hide();
			$('#registry-bp-videoModal, #registry-bp-maskLayout').hide();
			
			APP.videoPlayer[0].currentTime = 0;
			APP.videoPlayer[0].pause();

			console.log(APP.videoPlayer[0].dataset.name.replace('play', 'close'));
			console.log(APP.cm);

			Coremetrics.elementTag( {
				elementId: APP.videoPlayer[0].dataset.name.replace('play', 'close'),
				categoryId: APP.cm
			} );
		});

		$( '#registry-bp-videoModal video' ).on('ended',function() {
			var vid = Coremetrics.attributes({ 
				16: '3',
				17: Math.round($(this)[0].duration)
			});

			console.log(APP.videoPlayer[0].dataset.name);
			console.log(APP.cm);
	        
	     	Coremetrics.elementTag( {
		     	elementId: APP.videoPlayer[0].dataset.name,
				categoryId: APP.cm,
				attributes: vid
		} );
	     	APP.videoPlayer.hide();
	        $('#registry-bp-videoModal, #registry-bp-maskLayout').hide();
	    });

	    $( '#registry-bp-videoModal video' ).on("play", function () {
	    	var vid = Coremetrics.attributes({ 
				16: '2',
				17: Math.round($(this)[0].duration)
			});

			console.log(APP.videoPlayer[0].dataset.name);
			console.log(APP.cm);
	    	
	     	Coremetrics.elementTag( {
	     		elementId: APP.videoPlayer[0].dataset.name,
				categoryId: APP.cm,
				attributes: vid
	     	} );

	    });

	    $( '#registry-bp-videoModal video' ).on("pause", function () {
	    	if ( $(this)[0].ended !== true && $(this)[0].currentTime > 0 ) {
	    		var vid = Coremetrics.attributes({ 
					16: '1',
					17: Math.round($(this)[0].duration)
				});

	    		console.log(APP.videoPlayer[0].dataset.name);
				console.log(APP.cm);
	    		
		     	Coremetrics.elementTag( {
		     		elementId: APP.videoPlayer[0].dataset.name,
					categoryId: APP.cm,
					attributes: vid
		     	} );

	    	}
	    });
	};

	$(document).ready(function () {

		$('#registry-bp-videoModal video').each( function(){
			APP.fetchVideoData( APP.projectAssets + this.dataset.videoSrc, this );
		});

	});

	$(window).load(function() {

		APP.init();
	});

});
