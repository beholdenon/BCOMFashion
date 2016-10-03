/**
 * Created by Leonardo Brandao on 10/03/16.
 */

'use strict';

var APP = {
	cm: 'BWEDD_Registry_Home',
	cmElementCat: 'BWEDD_WHY_REGISTER' //---> coremetrics project prefix
};

APP.init = function () {
	var self = this;

	self.listeners();
	self.coremetrics('Pageview', self.cm, 'BWEDD_Why_Register');
};

APP.listeners = function () {
	$('.registry-bp-hero-link').on('click', function ( event ){
		
		event.preventDefault();
		
		var target = $( this ).attr( 'href' );
		$('html, body').animate({
            scrollTop: $( target ).offset().top
        }, 'slow' );

        APP.coremetrics('Element', APP.cmElementCat, target.substring(1));
	});
};

//(req) CM business logic
APP.coremetrics = function (tagType, categoryID, pageID) {
	var self = this;

	if (tagType === 'Pageview') {
		try {
			window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
		} catch (e) {
			self.logErr('CoreM_err: ' + e);
		}
		self.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
	} else if (tagType === 'Element') {
		try {
			window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID);
		} catch (e) {
			self.logErr('CoreM_err: ' + e);
		}

		self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
	}
};

//(req) custom logger for 'dev' environment
APP.logErr = function (log) {
	//log errors only on DEV mode
	if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
		window.console.info(log);
	}
};


$(window).load(function() {
	APP.init();
});
