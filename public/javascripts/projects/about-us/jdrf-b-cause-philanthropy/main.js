/**
 * Created by Alessandro Ribeiro on 10/20/16.
 */

'use strict';

require([
    'jquery'
], function( $ ) {

    var APP = {
        cmElementCat: 'b_cause_links',
        cmAttrbute2: '-_-lp-xx-xx-xx.jdrf',
        cmLinkName: 'jdrf'
    };

    //(req) CM business logic
    APP.coremetrics = function (categoryID, pageID) {
        var self = this;

        if ( $('.bl_mobile').length > 0 ){
            categoryID = 'mbl:' + categoryID;
            pageID = 'mbl:' + pageID;
        }

        try {
            window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID, APP.cmAttrbute2 );
        } catch (e) {
            self.logErr('CoreM_err: ' + e);
        }

        self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
    };

    //(req) custom logger for 'dev' environment
    APP.logErr = function (log) {
        //log errors only on DEV mode
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };

    $( window ).load(function() {
        $('.jdrf-link').on('click', function () {
            APP.coremetrics(APP.cmElementCat, APP.cmLinkName);
        });
	});
});
