$( window ).load(function() {

//===============================================================================================================//
//===============================================================================================================//

	'use strict';

	$.fn.coreTag('Pageview', 'fall16_100percent--lookbook-men');


	$('.svg_bg_animate').each(function() {
		$(this).data('initPositionTop', parseFloat($(this).css('top'), 10)  );
	});

	$(window).scroll(function(){

		$('.svg_bg_animate').each(function(index) {
			$(this).css({
				'top':(  ( $(window).scrollTop() - $(this).parent().offset().top ) / (2+(index%5)*1.5 ) + $(this).data('initPositionTop')+100  )+'px'
			});
		});
		$('.svg_bg_animate').not('#row_odell_svg1, #row_varvatos_svg4, #row_canali_svg4, #row_kooples_men_svg2, #row_polo_svg2, #row_eleventy_svg7').each(function() {
			$(this).css({
				'opacity': 1-Math.abs( ($(window).scrollTop() - $(this).parent().offset().top)+100 )/500  
			});
		});		

		if ($('#row_odell').isVisible()) {

			$('#row_odell_svg1').css({
				'top':(-400)+'px'
			});

		}

		if ($('#row_theory_men').isVisible()) {

			$('#row_odell_svg1').css({
				'top':(1000)+'px'
			});

		}

		if ($('#row_varvatos').isVisible()) {
			$('#row_varvatos_svg4').css({
				'top':(480)+'px'
			});

		}

		if ($('#row_canali').isVisible()) {
			$('#row_varvatos_svg4').css({
				'top':(760)+'px'
			});			

			$('#row_canali_svg4').css({
				'top':(730)+'px'
			});

		}

		if ($('#row_kooples_men').isVisible()) {
			$('#row_canali_svg4').css({
				'top':(1160)+'px'
			});

			$('#row_kooples_men_svg2').css({
				'top':(-90)+'px'
			});

		}

		if ($('#row_polo').isVisible()) {
			$('#row_kooples_men_svg2').css({
				'top':(1000)+'px'
			});

			$('#row_polo_svg2').css({
				'top':(-80)+'px'
			});

		}

		if ($('#row_eleventy').isVisible()) {

			$('#row_polo_svg2').css({
				'top':(1000)+'px'
			});

			$('#row_eleventy_svg7').css({
				'top':(734)+'px'
			});

		}

		if ($('#row_burberry_men').isVisible()) {
			$('#row_eleventy_svg7').css({
				'top':(1600)+'px'
			});
		}

	});

   
});

