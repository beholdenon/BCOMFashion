'use strict';

$(document).ready( function($) {

	$('header, footer').remove();
	
	// driveTaxi();

	// setInterval( function(){
	// 	driveTaxi();
	// }, 10000);

	// $('#taxi').on('click', function () {
	// 	$('#')
	// });

	$('.window').on('click', function () {
		$('#lookbookSlideShow').show();
	});

	$('#overlayBg, #overlayClose').on('click', function () {
		$('#lookbookSlideShow').hide();
	});

	$('#campaignLink').on('click', function () {
		$('#storeBg, #lookbooks, .window').hide();
		$('#about').show();
		$('#campaignLink').addClass('active');
	});

	$('.link .logo').on('click', function () {
		$('#about, #lookbooks').hide();
		$('#storeBg, .window').show();
		$('.link').removeClass('active');
	});

	$('#lookbookLink').on('click', function () {
		$('#storeBg, #about, .window').hide();
		$('#lookbooks').show();
		$('#lookbookLink').addClass('active');
	});

	$('.arrow').on('click', function() {
		var position =  $(this).parent().find('.active').attr('id').substring($(this).parent().find('.active').attr('id').indexOf('-')+1);

		var slide = {

			left: function (p) {
				$( '#lookbookPage-' + (parseInt(p)+1) ).css('left','-100vw').show();
				$( '#lookbookPage-' + (parseInt(p)+1) + ', #lookbookPage-' + p ).animate({
					'left': '+=100vw'
				},600);
			},

			right: function (p) {
				$( '#lookbookPage-' + (parseInt(p)+1) ).css('left','100vw').show();
				$( '#lookbookPage-' + (parseInt(p)+1) + ', #lookbookPage-' + p ).animate({
					'left': '-=100vw'
				},600);
			}

		};

		if ( $(this).hasClass('left') ) {slide.left(position);} else {slide.right(position);}

	});


});

// function driveTaxi() {
// 	$('#taxi').animate({
// 		left: '200%'
// 	}, 10000, function() {
// 		$('#taxi').css('left', '-100%');
// 	});
// }