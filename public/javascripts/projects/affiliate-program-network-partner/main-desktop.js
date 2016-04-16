/**
 * Created by Leonardo Brandao on 4/15/16.
 */

'use strict';

var APP = {
    cm: 'affiliate_sign_up', //---> coremetrics project prefix
};

APP.init = function () {
    var self = this;

    self.coremetrics('Pageview', self.cm, self.cm);
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
            window.BLOOMIES.coremetrics.cmCreatePageElementTag('MBL:' + pageID, categoryID);
        } catch (e) {
            self.logErr('CoreM_err: ' + e);
        }

        self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
    }
};

$('.affiliate_program_link').on('click', function () {
    var cmTag = $(this).data('cm');
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
