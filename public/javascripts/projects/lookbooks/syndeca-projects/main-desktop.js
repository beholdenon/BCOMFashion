window.SYNDECA = window.SYNDECA || {};

window.SYNDECA.vertical = (function(window, document, $) {
    'use strict';
    var isTablet = $('body').hasClass('bl_tablet') ? true : false;
    //back to top listener
    $('.desktop_back_to_top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow' );
    });
    $( window ).scroll(function() {
        if( !isTablet ) {
            checkHeightAndShowBackToTop();
        }
    });
    $(window).load(function() {
		    	
        window.BLOOMIES.coremetrics.cmCreatePageviewTag('SyndecaLookBook', 'SyndecaLookBook');
        if( !isTablet ) {
            checkHeightAndShowBackToTop();
        }
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