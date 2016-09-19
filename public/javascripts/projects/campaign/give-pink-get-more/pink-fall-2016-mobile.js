/* globals SERVICES */
'use strict';

var PINK = {

	cm: {
		category: '',
	},

	getNext: function (arrow) {
		var pos = $('.active').index('#doctors > li');

		if ( arrow.hasClass('arrowR') && pos >= $('#doctors > li').length-1 ) {
			pos = 0;
		} else if ( arrow.hasClass('arrowL') && pos <= 0 ) {
			pos =  $('#doctors > li').length-1;
		} else if ( arrow.hasClass('arrowR') ) {
			pos++;
		} else {
			pos--;
		}
		console.log( $('#doctors > li').eq(pos) );
		return $('#doctors > li').eq(pos);
	}
};

$(document).ready(function() {
	// PINK.updateShop(PINK.products);

	SERVICES.brightCove.getURL(function(res){
		$('#stories').attr('src', res);
	}, 5124807676001 );

	$('#stories').on('click', function () {
		$(this)[0].play();
	});

	$("#backToTop").on("click tap", function () {
		$('html, body').animate({
	        scrollTop: 0
	    }, 'slow');
	});

	$('.arrow').on('click', function () {
		var arrow = $(this),
			activeElem = $('#doctors > li.active'),
			nextElem = PINK.getNext(arrow),
			direction = 1;
			// distance = $('#doctors').width();

		if ( arrow.hasClass('arrowR') ) {
			direction = -1;
		}

		activeElem.removeClass('active').hide();
		nextElem.addClass('active').show();
		$('#doctorDots li').eq( $('.active').index('#doctors > li') ).addClass('active').siblings().removeClass('active');

		// nextElem.css('left', distance*(direction*-1));
		
		// $('.arrow').fadeOut('slow').promise().then( function() {
		// 	$(activeElem, nextElem).animate({left: "+="+distance*direction},500).promise().then(
		// 		function() {
		// 			activeElem.removeClass('active');
		// 			nextElem.addClass('active');

		// 			$('.arrow').fadeIn('slow');

		// 			$('#doctorDots li').eq( $('#doctors li').index('.active') ).addClass('active').siblings().removeClass('active');
		// 	});
		// });
			
	});
});