$( window ).load(function() {

//===============================================================================================================//
//===============================================================================================================//

	'use strict';

	$.fn.coreTag('Pageview', 'fall16_100percent--lookbook-women');

	$('.svg_bg_animate').each(function() {
		$(this).data('initPositionTop', parseFloat($(this).css('top'), 10)  );
	});

	$('.backToTop').on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, 700
		);
	});


	$(window).scroll(function(){

		$('.svg_bg_animate').each(function(index) {
			$(this).css({
				'top':(  ( $(window).scrollTop() - $(this).parent().offset().top ) / (2+index%5) + $(this).data('initPositionTop')+100  )+'px'
			});
		});


		if ($('#row_header').isVisible()) {
			$('#row_header_svg1').css({
				'top':($('#row_header').offset().top-340)+'px'
			});
		}

		if ($('#row_maje').isVisible()) {

			$('#row_header_svg1').css({
				'top':($('#row_maje').offset().top-300)+'px'
			});

			$('#row_aqua_svg2').css({
				'top':($('#row_maje').offset().top-600)+'px',
				'transform':'rotate(7deg)'

			});
		}

		if ($('#row_whistles').isVisible()) {

			$('#row_aqua_svg2').css({
				'top':($('#row_whistles').offset().top-800)+'px',
				'transform':'rotate(180deg)'
			});

			$('#row_whistles_svg5').css({
				'top':(360)+'px'
			});


		}

		if ($('#row_tory').isVisible()) {
			$('#row_whistles_svg5').css({
				'top':(1300)+'px'
			});

			$('#row_tory_svg2').css({
				'top':(-130)+'px'
			});



		}


		if ($('#row_kooples').isVisible()) {
			$('#row_tory_svg2').css({
				'top':(1100)+'px'
			});


		}

		if ($('#row_theory').isVisible()) {
			$('#row_theory_svg5').css({
				'top':(496)+'px'
			});		

		}
		if ($('#row_burberry').isVisible()) {
			$('#row_theory_svg5').css({
				'top':(1600)+'px'
			});		

			$('#row_burberry_svg3').css({
				'top':(-110)+'px'
			});
		}


		if ($('#row_salvatore').isVisible()) {
			$('#row_burberry_svg3').css({
				'top':(1000)+'px'
			});		
		}



		if ($('#row_wang').isVisible()) {
			$('#row_wang_svg3').css({
				'top':(60)+'px'
			});		
		}

		if ($('#row_ray').isVisible()) {
			$('#row_wang_svg3').css({
				'top':(1340)+'px'
			});		
		}



		if ($('#row_alice').isVisible()) {
			$('#row_alice_svg5').css({
				'top':(-174)+'px'
			});		
		}

		if ($('#row_karen').isVisible()) {
			$('#row_alice_svg5').css({
				'top':(1000)+'px'
			});

			$('#row_karen_svg1').css({
				'top':(-330)+'px'
			});
		}
		if ($('#row_rebecca').isVisible()) {
			$('#row_karen_svg1').css({
				'top':(1300)+'px'
			});
		}

	});

   
});

