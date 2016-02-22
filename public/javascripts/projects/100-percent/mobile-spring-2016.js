'use strict';

$(document).ready( function($) {

	var element = {
		'elementID': '',
		'elementCategory': 'spring16_100percent',
	}

	var find = '/';
	var re = new RegExp(find, 'g'),
		winPath = window.location.pathname.replace(re,'_');

	pageViewTag( 'mbl:fashion' + winPath.substring( 0, winPath.lastIndexOf('_') ), element.elementCategory);

	$('.top').on('click tap', function () {
		$(this).toggleClass('active');
		$(this).siblings().slideToggle(400);
	});

	//  COREMETRICS TAGS

	$('.subNav a').on("click tap", function () {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});

	$('#landing button, #landing a').on('click tap', function() {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});

	$('video').on('play', function () {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});


	function elementTag(element) {
        return window.cmCreatePageElementTag(element.elementID, element.elementCategory, element.attributes || null);
    }

});


