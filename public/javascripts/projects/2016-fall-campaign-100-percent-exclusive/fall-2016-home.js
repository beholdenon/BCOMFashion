$( window ).load(function() {

//===============================================================================================================//
//===============================================================================================================//

	'use strict';

	$.fn.coreTag('Pageview', 'fall16_100percent--lookbook-home');

	$('.svg_bg_animate').each(function() {
		$(this).data('initPositionTop', parseFloat($(this).css('top'), 10)  );
	});


	$(window).scroll(function(){

		$('.svg_bg_animate').each(function(index) {
			$(this).css({
				'top':(  ( $(window).scrollTop() - $(this).parent().offset().top ) / (2+index%5) + $(this).data('initPositionTop')+100  )+'px'
			});
		});
		$('.svg_bg_animate').not('#row_machael_svg2, #row_waterford_svg2').each(function() {
			$(this).css({
				'opacity': 1-Math.abs( ($(window).scrollTop() - $(this).parent().offset().top)+100 )/500  
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
   
});

