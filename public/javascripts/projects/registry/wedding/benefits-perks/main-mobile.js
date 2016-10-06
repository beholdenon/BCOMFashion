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
		Coremetrics.pageViewTag( 'BWEDD_Why_Register', self.cm );
	};

	$(window).load(function() {
		APP.init();
	});

});
