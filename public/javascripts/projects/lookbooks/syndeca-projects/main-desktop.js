window.SYNDECA = window.SYNDECA || {};

window.SYNDECA.vertical = (function(window, document, $) {
    'use strict';

    //back to top listener
    $('.desktop_back_to_top, #syndeca_mobile_back_to_top_button').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow' );
    });

    $( window ).scroll(function() {
      checkHeightAndShowBackToTop();
    });

    $(window).load(function() {
		    	
        window.BLOOMIES.coremetrics.cmCreatePageviewTag('SyndecaLookBook', 'SyndecaLookBook');
        checkHeightAndShowBackToTop();

    });

    function checkHeightAndShowBackToTop(){
        var syndecaWrapper = $('#syndeca'),
            syndecaHeight = syndecaWrapper.height();

        if(syndecaHeight >= 1000) {
            var backToTopBtn = $('.desktop_back_to_top');
            backToTopBtn.show();
        }
    }

}(window, document, jQuery));