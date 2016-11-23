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
            cmElementId = 'business_gifts_stores',
            cmAttrbute2 = '-_-Corporate_Services_(ab-sh-xx-xx.corporate)',
            serverDate = new Date( $('input[name="timeStamp"]').val() ),
            expirationDate = new Date(2016,11,26,0,1);

        if ( serverDate >= expirationDate ) {
            $('.holiday').remove();
        }

        $('.store-top, .store-bottom').on('click', function () {
            var link = $( this ),
                className = link.attr('class'),
                elementId = cmElementId + (className.indexOf( 'top' ) !== -1 ? '_top_' : '_bottom_') + link.data('elementId');

            if ( !isMobile && link.hasClass( 'phone-number' ) ) { return; }
            APP.coremetrics(cmElementCat, elementId, cmAttrbute2);
        });
	});
});
