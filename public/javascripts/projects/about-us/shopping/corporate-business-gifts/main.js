/**
 * Created by Alessandro Ribeiro on 11/07/16.
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
            categoryID = 'MBL:' + categoryID;
            pageID = 'MBL:' + pageID;
        }

        try {
            window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID, attributes);
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
        var isMobile =  $('.bl_mobile').length,
            cmElementCat = 'Business_Gifts',
            cmElementId = 'business_gifts_phonenumber',
            serverDate = new Date( $('input[name="timeStamp"]').val() ),
            expirationDate = new Date(2017,0,1,0,1);

        if ( serverDate >= expirationDate ) {
            $('.holiday').remove();
        }

        $( '.phone-number' ).on('click', function() {
            if ( isMobile ) {
                APP.coremetrics(cmElementCat, cmElementId);
            }
        });

        $('.email').on('click', function () {
            var cmElementId = 'business_gifts_email',
                cmAttrbute2 = '-_-Corporate_Services_(ab-sh-xx-xx.corporate)';

            APP.coremetrics(cmElementCat, cmElementId, cmAttrbute2);
        });

        $('.store').on('click', function () {
            var cmElementId = 'business_gifts_stores',
                cmAttrbute2 = '-_-Corporate_Services_(ab-sh-xx-xx.corporate)';

            APP.coremetrics(cmElementCat, cmElementId, cmAttrbute2);
        });
	});
});
