'use strict';

$(document).ready( function($) {

	// ===== Init Actions =====

	$('header, footer').remove();
	
	driveTaxi();

	setInterval( function(){ driveTaxi(); }, 14000);

	$('#taxi').on('click tap', function () {
		$('#taxiOverlay').show();
	});

	// ===== Page Interactions =====

	// closed the taxi overlay
	$('#overlayBg, .close').on('click tap', function () {
		$('#taxiOverlay').hide();
	});

	// clicked the main logo
	$('.link .logo').on('click tap', function () {
		$('#about, #lookbooks, #bloomoticons').hide();
		$('#storeBg, .window').show();
		$('#topNav').addClass('main');
		$('.link').removeClass('active');
		$('body').removeAttr('style');
		$('#taxi').show();
	});

	// clicked About the Campaign
	$('#campaignLink').on('click tap', function () {
		$('#storeBg, #lookbooks, .window, #bloomoticons').hide();
		$('#about').show();
		$('#topNav').removeClass('main');
		$('.link').removeClass('active');
		$('#campaignLink').addClass('active');
		$('body').css('background-color', '#E6EAEC');
		$('#taxi').hide();
	});

	// clicked Bloomoji nav link
	$('#mojiLink').on('click tap', function () {
		$('#storeBg, #lookbooks, .window, #about').hide();
		$('#bloomoticons').show();
		$('#topNav').removeClass('main');
		$('.link').removeClass('active');
		$('#mojiLink').addClass('active');
		$('body').css('background-color', '#DADAD8');
		$('#taxi').hide();
	});

	// clicked Lookbook in the top nav
	$('#lookbookDefaultLink').on('click tap', function () {
		lookbookSetup();

		$('.holdingPen .slide').clone().appendTo( '#slideBox' );
		$('#slideBox .slide:first-child').addClass('active');
	});

	// clicked on womens in the lookbook dropdown
	$('#lookbookDropdown .women').on('click tap', function() {
		lookbookSetup();
		$('.holdingPen.women .slide').clone().appendTo( '#slideBox' );
		$('#slideBox .slide:first-child').addClass('active');
	});

	// clicked on mens in the lookbook dropdown
	$('#lookbookDropdown .men').on('click tap', function() {
		lookbookSetup();
		$('.holdingPen.men .slide').clone().appendTo( '#slideBox' );
		$('#slideBox .slide:first-child').addClass('active');
	});

	// clicked on home in the lookbook dropdown
	$('#lookbookDropdown .home').on('click tap', function() {
		lookbookSetup();
		$('.holdingPen.home .slide').clone().appendTo( '#slideBox' );
		$('#slideBox .slide:first-child').addClass('active');
	});

	// clicked on a store window
	$('.window').on('click tap', function () {
		lookbookSetup();

		$('.holdingPen .slide').clone().appendTo( '#slideBox' );
		$('#slideBox .slide').eq( $(this).attr('data-window') ).addClass('active');
	});

	function lookbookSetup() {
		$('#storeBg, #about, .window, #bloomoticons').hide();
		$('#lookbooks').show();
		$('.link').removeClass('active');
		$('#lookbookDefaultLink').addClass('active');
		$('#topNav').removeClass('main');
		$('#slideBox').html('');
		$('#taxi').hide();
	}

	// clicked on a slide show arrow
	$('.arrow').on('click tap', function() {
		var position =  $('#slideBox .active').index(),
			next;

		var slide = {

			left: function (p, n) {

				if (n < 0) n = $('#slideBox .slide').length - 1;

				$('#slideBox .slide').eq(n).css('left','-100vw').show();
				var target = $('#slideBox .slide').filter( function (i){
					return $.inArray(i, [p,n]) > -1;
				}) ;

				target.animate({'left': '+=100vw'},600, function () {
					$('#slideBox .active').removeClass('active');
					$('#slideBox .slide').eq(n).addClass('active');
					$('.arrow').removeClass('active');
				});
			},

			right: function (p, n) {

				if (n >= $('#slideBox .slide').length) n=0;

				$('#slideBox .slide').eq(n).css('left','100vw').show();
				var target = $('#slideBox .slide').filter( function (i){
					return $.inArray(i, [p,n]) > -1;
				}) ;

				target.animate({'left': '-=100vw'},600, function () {
					$('#slideBox .active').removeClass('active');
					$('#slideBox .slide').eq(n).addClass('active');
					$('.arrow').removeClass('active');
				});
			}

		};

		if ( !$(this).hasClass('active')) {
			$('.arrow').addClass('active');
			if ( $(this).hasClass('left') ) {
				next = position-1;
				slide.left(position, next);
			} else {
				next = position+1;
				slide.right(position, next);
			}
		}

	});


});

function driveTaxi() {
	$('#taxi').animate({
		left: '200%'
	}, 10000, function() {
		$('#taxi').css('left', '-100%');
	});
}