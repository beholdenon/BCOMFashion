'use strict';

(function(window, document, $) {

    $(document).ready(function() {
	    $(document).foundation();

        $('.left-off-canvas-toggle, .exit-off-canvas').on('click', function() {
            if ($('.off-canvas-wrap').hasClass('move-right')) {
                $('.off-canvas-wrap').css('height', '100%');
                $('body').css({
                	'height': '100%',
                	'overflow': 'initial'
                }); 
                $('.left-off-canvas-toggle').removeClass('open');               
            } else {
            	$('.left-off-canvas-toggle').addClass('open');
                var height = document.body.clientHeight;
                $('.off-canvas-wrap').css('height', height);
                $('body').css({
                	'height': height,
                	'overflow': 'hidden'
                });
                $('.arriving-input, .departing-input').hide();
            }
        });

	    $(window).on('orientationchange resize', function() {
	        if ($('.off-canvas-wrap').hasClass('move-right')) $('.left-off-canvas-toggle').click();
	    });   	         
    });
})(window, window.document, jQuery);