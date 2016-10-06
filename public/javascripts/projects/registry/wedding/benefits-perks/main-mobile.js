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
		$('.registry-bp-back-to-top-button').on('click', function ( event ){

			event.preventDefault();
			event.stopPropagation();

			$('html, body').animate({
	            scrollTop: 0
	        }, 'slow' );
		});
	};

	$(window).load(function() {
		APP.init();
	});

});
