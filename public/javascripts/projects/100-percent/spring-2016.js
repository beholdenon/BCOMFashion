'use strict';

$(document).ready( function($) {

	// ===== Init Actions =====
	$('header, footer').remove();

	(function () {
		var hash = location.hash;

		console.log(hash);

		if ( hash != undefined && hash != '' ) {

			$('#lookbookPage-' + hash.substring(1)).siblings().removeClass('active');
			$('#lookbookPage-' + hash.substring(1)).fadeIn(400, function() {
				$('#lookbookPage-' + hash.substring(1)).addClass('active');
			});

			console.log('#lookbookPage-' + hash.trim('#'))
		} else {
			if ( $('#lookbooks') ) {
				$('#lookbooks .slide:first-child').fadeIn(800, function() {
					$('#lookbooks .slide:first-child').addClass('active');
				});
			}
		}



	})();

	$('#taxi').on('click tap', function () {
		$('#taxiOverlay').show();
		if ( $('#emoji-video:visible') ) {
			$('#emoji-video').get(0).play();
		}
	});
	
	// ===== Page Interactions =====

	// closed the taxi overlay
	$('#overlayBg, .close').on('click tap', function () {
		$('#taxiOverlay').hide();
		$('#emoji-video').get(0).pause();
	});

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

	// clicked on a slide show arrow
	$('.arrow').on('click tap', function() {
		var position =  $('#slideBox .active').index(),
			next;

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

	$('#slideBox .slide').hammer().on('swipeleft', '.slide', function () {
		console.log('LEFT');
		var position =  $('#slideBox .active').index(),
			next;

		if ( !$('.arrow').hasClass('active')) {
			$('.arrow').addClass('active');
			next = position+1; 
			slide.right(position, next);
		}
	});

	$('#slideBox .slide').hammer().on('swiperight', '.slide', function () {
		console.log('RIGHT ');
		var position =  $('#slideBox .active').index(),
			next;

		if ( !$('.arrow').hasClass('active')) {
			$('.arrow').addClass('active');
			next = position-1;
			slide.left(position, next);
		}
	});

	// Coremetrics 

	var element = {
		'elementID': '',
		'elementCategory': 'spring16_100percent',
	}

	$('#topNav li, #topNav a').on("click tap", function () {
		element.elementID = 'topNav-' + $(this).attr('id');
		elementTag(element);
	});

	$('#landingStore > a, #taxi').on("click tap", function () {
		element.elementID = 'homepage-' + $(this).attr('id');
		elementTag(element);
	});

	$('#lookbooks .arrow').on("click tap", function () {
		element.elementID = $('#lookbooks .slide.active').attr('id') + '-' + $(this).attr('id');
		elementTag(element);
	});

	function elementTag(element) {
        return window.cmCreatePageElementTag(element.elementID, element.elementCategory, element.attributes || null);
    }

});
