$(document).ready(function($) {
	'use strict';

	var emojiCount = 6,
		start = 1;

	var animation = {

		play: function () {

				setTimeout( function () {

					$('#emoji_'+start).show().siblings().hide();
					console.log(start);
					
					if ( start <= emojiCount ) {
						animation.play();
					} else {
						$('#emoji-layers .layer').hide();
					}
					start++;
				}, 1000);


		},


	};

	$('#playAgain').on('click', function () {
		start=1;
		$('#emoji_1').show();
		animation.play();
	});

	animation.play();

});