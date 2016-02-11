'use strict';

$(document).ready( function($) {

	$('.top').on('click tap', function () {
		$(this).toggleClass('active');
		$(this).siblings().slideToggle(400);
	});

	$('.landing').on('click tap', function () { screenSwitch('#landing'); });
	$('.getApp').on('click tap', function () { screenSwitch('#app'); });
	$('.seeAbout').on('click tap', function () { screenSwitch('#about'); });

});


function screenSwitch ( target ) {

	$(target).removeClass('hidden').siblings('.content').addClass('hidden');
	$('#dropdownNav .subNav').slideUp(400);
	$('#dropdownNav .top').toggleClass('active');
}