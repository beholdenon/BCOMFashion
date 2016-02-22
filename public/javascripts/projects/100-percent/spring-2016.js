'use strict';

$(document).ready( function($) {

	var element = {
		'elementID': '',
		'elementCategory': 'spring16_100percent',
	}

	var find = '/';
	var re = new RegExp(find, 'g'),
		winPath = window.location.pathname.replace(re,'_');

	pageViewTag( 'fashion' + winPath.substring( 0, winPath.lastIndexOf('_') ), element.elementCategory);

	// ===== Init Actions =====
	$('header, footer').remove();

	(function () {
		var hash = location.hash;

		if ( hash != undefined && hash != '' ) {

			$('#lookbookPage-' + hash.substring(1)).siblings().removeClass('active');
			$('#lookbookPage-' + hash.substring(1)).fadeIn(400, function() {
				$('#lookbookPage-' + hash.substring(1)).addClass('active');
				pageViewTag($('#slideBox .active').attr('id'), element.elementCategory);
			});
			
			
		} else {
			if ( $('#lookbooks') ) {
				$('#lookbooks .slide:first-child').fadeIn(800, function() {
					$('#lookbooks .slide:first-child').addClass('active');
					pageViewTag($('#slideBox .active').attr('id'), element.elementCategory);
				});
				
			}
		}

	})();

	$('#taxi').on('click tap', function () {
		element.elementID = $(this).attr('id');
		elementTag(element);

		var testDate = new Date();
		$('#taxiOverlay').show();

		// if ( testDate.getDate() === 10 && testDate.getMonth() === 2 && testDate.getFullYear() === 2016 ) {
		// 	$('#blooperVideo').hide();
		// 	$('#scavengerHunt').show();
		// } else if ( $('#taxi-video-play:visible') ) {
		// 	$('#taxi-video-play').get(0).play();
		// }

		if ( $('#taxi-video-play:visible') ) {
			$('#taxi-video-play').get(0).play();
		}
	});
	
	// ===== Page Interactions =====

	$('#lookbook, #shopLink').on('click tap', function () {
		$(this).find('ul').toggle();
	});


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
			setTimeout(function(){ pageViewTag($('#slideBox .active').attr('id'), element.elementCategory) }, 650);
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

			setTimeout(function(){ pageViewTag($('#slideBox .active').attr('id'), element.elementCategory) }, 650);
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


	$('#topNav a').on("click tap", function () {
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

	$('video').on('play', function () {
		element.elementID = $(this).attr('id');
		elementTag(element);
	});

	function elementTag(element) {
        return window.cmCreatePageElementTag(element.elementID, element.elementCategory, element.attributes || null);
    }

    function pageViewTag (pageID, catID, attrID, attrData){
        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

        var attr = parseInt(attrID);
        var dataAttr = {};
        dataAttr[attr] = attrData;

        window.BLOOMIES.coremetrics.pageViewExploreAttributes.append(dataAttr);

        window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, catID, '', '');        
    }

});
