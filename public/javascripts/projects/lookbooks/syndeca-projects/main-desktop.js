window.SYNDECA = window.SYNDECA || {};

window.SYNDECA.vertical = (function(window, document, $) {
    'use strict';

    //back to top listener
    $('.desktop_back_to_top, #syndeca_mobile_back_to_top_button').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow' );
    });

}(window, document, jQuery));