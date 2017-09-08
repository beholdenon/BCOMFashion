/**
 * Created by Alessandro Ribeiro on 11/07/16.
 */

'use strict';

require([ 'jquery' ], function( $ ) {

    $(document).ready(function() {

        var isMobile = window.BLOOMIES.isMobile,
            cmElementCat = isMobile ? 'mbl: Business_Gifts' : 'Business_Gifts',
            cmElementId = isMobile ? 'mbl: business_gifts_stores' : 'business_gifts_stores',
            cmAttrbutes = '-_-Corporate_Services_(ab-sh-xx-xx.corporate)',
            serverDate = new Date( $('input[name="timeStamp"]').val() ),
            expirationDate = new Date(2017,11,24,0,1);
        
        if ( serverDate >= expirationDate ) {
            $('.shop-holiday').remove();
        }

        $('.contact-details').on('click', function () {
            var link = $( this ),
                elementId = cmElementId + '_top_'+ link.data('elementId');

            window.BLOOMIES.coremetrics.cmCreatePageElementTag(elementId, cmElementCat, cmAttrbutes);
        });
	});
});
