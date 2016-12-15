/**
 * Created by Leonardo Brandao on 11/20/16.
 */

'use strict';

var APP = {
	cm: 'MBL:onsite_search', //---> coremetrics project prefix
};

APP.init = function () {
	var self = this;

	self.coremetrics('Pageview', self.cm, 'MBL:no_results-store_only_chloe_shoes');
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

$('.chloe-phone-link').on('click', function () {
    var cmTag = $(this).data('store');
    APP.coremetrics('Element', APP.cm, 'MBL:'+cmTag);
});

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
