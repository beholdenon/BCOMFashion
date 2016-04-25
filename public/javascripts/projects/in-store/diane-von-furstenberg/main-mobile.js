/**
 * Created by Leonardo Brandao on 4/15/16.
 * Edited by Marco Paulo on 4/22/16
 */

'use strict';

var APP = {
	cm: 'mbl:onsite_search', //---> coremetrics project prefix
};

APP.init = function () {
	var self = this;

	self.coremetrics('Pageview', self.cm, 'no_results-store_only_{diane_von_furstenberg}');
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

$('.dvf-phone-link').on('click', function () {
    var cmTag = $(this).data('store');
    console.log(cmTag);
    APP.coremetrics('Element', APP.cm, cmTag);
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
