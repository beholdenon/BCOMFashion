/* globals SERVICES,BLOOMIES */
'use strict';

(function($) {

    $('.desktop_back_to_top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow' );
        //window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + 'Back_to_top', hasMBL + 'Makeup-date_makeup-tutorial');
    });

})(jQuery);