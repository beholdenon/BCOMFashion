/**
 * Created by Leonardo Brandao on 4/15/16.
 * Edited by Marco Paulo on 4/22/16
 */

'use strict';

var APP = {
	cm: 'onsite_search', //---> coremetrics project prefix
};

APP.init = function () {
	var self = this;

	self.coremetrics('Pageview', self.cm, 'no_results-store_only_{louis_vuitton}');
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
