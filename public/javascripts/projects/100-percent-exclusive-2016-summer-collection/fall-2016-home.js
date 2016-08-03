$( window ).load(function() {

//===============================================================================================================//
//===============================================================================================================//

	'use strict';


	$('.svg_bg_animate').each(function() {
		$(this).data('initPositionTop', parseFloat($(this).css('top'), 10)  );
	});

	$(window).scroll(function(){

		$('.svg_bg_animate').each(function(index) {
			$(this).css({
				'top':(  ( $(window).scrollTop() - $(this).parent().offset().top ) / (2+index%5) + $(this).data('initPositionTop')+100  )+'px'
			});
		});




		if ($('#row_machael').isVisible()) {

			$('#row_machael_svg2').css({
				'top':(80)+'px',
			});
		}

		if ($('#row_waterford').isVisible()) {

			$('#row_machael_svg2').css({
				'top':(900)+'px',
			});

			$('#row_waterford_svg2').css({
				'top':(-80)+'px'
			});
		}

		if ($('#row_jars').isVisible()) {

			$('#row_waterford_svg2').css({
				'top':(850)+'px',
			});
		}



	});



    // function trace (log) {
    //     if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
    //         window.console.info(log);
    //     }
    // }

    
});

