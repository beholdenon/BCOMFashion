(function () {
	'use strict';
    window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();
    var hasMBL = ( window.BLOOMIES.isMobile === true ? "mbl:" : "");    
    var isTablet = (window.BLOOMIES.isMobile === false && window.innerWidth <= 1024 ) ? true : false;

    //back to top listener
    $('.desktop_back_to_top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 'slow' );
        window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + 'Back_to_top', hasMBL + 'Furniture_Mattress-WorryNoMore');
    });

    $('#mattress-anchor').on('click', function() {
        window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + 'Scroll_Down-Mattress', hasMBL + 'Furniture_Mattress-WorryNoMore');
    });

    $( window ).scroll(function() {
        if( !isTablet ) {
            checkHeightAndShowBackToTop();
        }
    });

    $(window).load(function() {
        
        window.BLOOMIES.coremetrics.cmCreatePageviewTag(hasMBL + 'Furniture_Mattress-WorryNoMore', hasMBL + 'Furniture_Mattress-WorryNoMore');

        if( !isTablet ) {
            checkHeightAndShowBackToTop();
        }
    });

    function checkHeightAndShowBackToTop(){
        var wrapper = $('#bl_main_container');
        var pHeight = wrapper.height();
        var backToTopBtn = $('.desktop_back_to_top');
        var buttonShowHeight = 1000;
        
        if( pHeight >= buttonShowHeight  && backToTopBtn.offset().top >= buttonShowHeight ) {
            backToTopBtn.show();
        } else {
            backToTopBtn.hide();
        }
    }
    
})();

