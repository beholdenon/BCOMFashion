$(document).ready(function($) {
	'use strict';

	var emojiCount = 6,
		start = 1;

	var animation = {

		play: function () {

				setTimeout( function () {

					$('#emoji_'+start).show().siblings().hide();
					
					if ( start <= emojiCount ) {
						animation.play();
					} else {
						$('#emoji-layers .layer').hide();
					}
					start++;
				}, 400);


		},


	};

	$('#playAgain').on('click', function () {
		start=1;
		$('#emoji_1').show();
		animation.play();
	});

	// window load checks to make sure all of the emoji background are loaded before starting the animation.
	$(window).load( function() {
		$('.content').animate({'opacity': 1}, 1000, function(){
			animation.play();
		});
		
	}); 

});