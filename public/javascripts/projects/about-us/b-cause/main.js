/**
 * Created by Alessandro Ribeiro on 10/20/16.
 */

'use strict';

require([
    'jquery'
], function( $ ) {

    var APP = {};

    //(req) CM business logic
    APP.coremetrics = function (categoryID, pageID, attributes) {
        var self = this;

        if ( $('.bl_mobile').length > 0 ){
            categoryID = 'mbl:' + categoryID;
            pageID = 'mbl:' + pageID;
        }

        try {
            window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID, attributes );
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
        if ( $('.bl_mobile').length === 0 ) {
            $('.b-cause-body .b-cause-link').attr('target', '_blank');
        }

        $('.jdrf-link').on('click', function () {
            var cmElementCat = 'b_cause_links',
                cmAttrbute2 = '-_-lp-xx-xx-xx.jdrf',
                cmLinkName = 'jdrf';

            APP.coremetrics(cmElementCat, cmLinkName, cmAttrbute2);
        });

        $('.bcrf-link').on('click', function () {
            var cmElementCat = 'b_cause_links',
                cmAttrbute2 = '-_-lp-xx-xx-xx.bcrf';

            APP.coremetrics(cmElementCat, $(this).data('linkName'), cmAttrbute2);
        });

        $('.childmind-link').on('click', function () {
            var cmElementCat = 'b_cause_links',
                cmAttrbute2 = '-_-lp-xx-xx-xx.childmind',
                cmLinkName = 'childmind';

            APP.coremetrics(cmElementCat, cmLinkName, cmAttrbute2);
        });

        $('.helpusa-link').on('click', function () {
            var cmElementCat = 'b_cause_links',
                cmAttrbute2 = '-_-lp-xx-xx-xx.mentoringusa';

            APP.coremetrics(cmElementCat, $(this).data('linkName'), cmAttrbute2);
        });
	});
});
