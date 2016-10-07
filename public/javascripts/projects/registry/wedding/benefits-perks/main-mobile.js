/**
 * Created by Leonardo Brandao on 10/03/16.
 */

'use strict';

require([
    'jquery',
    'coremetrics',
], function($, Coremetrics) {

	var APP = {
		cm: 'MBL:BWEDD_Registry_Home'
	};

	APP.init = function () {
		var self = this;

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
	};

	$(window).load(function() {
		APP.init();
	});

});
