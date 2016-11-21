/**
 * Created by Leonardo Brandao on 10/03/16.
 */

'use strict';

require([
    'jquery',
    'coremetrics',
], function($, Coremetrics) {

	var APP = {
		cm: 'BWEDD_Registry_Home',
		cmElementCat: 'BWEDD_WHY_REGISTER'
	};

	APP.init = function () {
		var self = this;

		self.listeners();
		Coremetrics.pageViewTag( 'BWEDD_Why_Register', self.cm );
	};

	APP.listeners = function () {
		$('.registry-bp-hero-link').on('click', function ( event ){
			
			event.preventDefault();
			
			var target = $( this ).attr( 'href' ),
				elementCM = {};
			$('html, body').animate({
	            scrollTop: $( target ).offset().top
	        }, 'slow' );

	        elementCM.elementID = target.substring(1);
	        elementCM.elementCategory = APP.cmElementCat;

	        Coremetrics.elementTag(elementCM);
		});
	};

	$(window).load(function() {
		APP.init();
	});

});
