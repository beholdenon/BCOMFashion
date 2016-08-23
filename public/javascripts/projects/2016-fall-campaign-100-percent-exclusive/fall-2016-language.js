$( window ).load(function() {

//===============================================================================================================//
//===============================================================================================================//

	'use strict';

	$.fn.coreTag('Pageview', 'fall16_100percent--ABC');


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

	$('.language_explore').on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: $('.letter_a').offset().top ,
		 	}, 700
		);
	});

	var languageSection=-1;
	var	languagePageRange=[0,
						$('.letter_b').offset().top,
						$('.letter_d').offset().top,
						$('.letter_f').offset().top,
						$('.letter_h').offset().top,
						$('.letter_j').offset().top,
						$('.letter_l').offset().top,
						$('.letter_n').offset().top,
						$('.letter_p').offset().top,
						$('.letter_r').offset().top,
						$('.letter_t').offset().top,
						$('.letter_v').offset().top,
						$('.letter_x').offset().top,
						$('.letter_z').offset().top,
						$('.letter_z').offset().top+$('.letter_z').height()
						];
	var languagePageview=["0",
						"b",
						"d",
						"f",
						"h",
						"j",
						"l",
						"n",
						"p",
						"r",
						"t",
						"v",
						"x",
						"z",
						"bottom"];
	getSection($(window).scrollTop());

	$(window).scroll(function(){

		$('.svg_bg_animate').each(function(index) {
			$(this).css({
				'top':(  ( $(window).scrollTop() - $(this).parent().offset().top ) / (5+index%5) + $(this).data('initPositionTop')+100  )+'px'
			});
		});

		languagePageRange=[0,
						$('.letter_b').offset().top,
						$('.letter_d').offset().top,
						$('.letter_f').offset().top,
						$('.letter_h').offset().top,
						$('.letter_j').offset().top,
						$('.letter_l').offset().top,
						$('.letter_n').offset().top,
						$('.letter_p').offset().top,
						$('.letter_r').offset().top,
						$('.letter_t').offset().top,
						$('.letter_v').offset().top,
						$('.letter_x').offset().top,
						$('.letter_z').offset().top,
						$('.letter_z').offset().top+$('.letter_z').height()
						];
		getSection($(window).scrollTop());
	});


	function getSection(topvalue){
		for(var i = 0; i < languagePageRange.length-1; i++ ){
			if( topvalue>=languagePageRange[i] && topvalue<languagePageRange[i+1] ){
				if(languageSection!==i){
					languageSection=i;
					$.fn.coreTag('Pageview', 'fall16_100percent--ABC_'+languagePageview[languageSection+1]);
				}
				return;
			}
		}
	}



  
});

