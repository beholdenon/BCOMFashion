'use strict';

$(document).ready(function() {

	if ( window.location.href.indexOf( '?' ) >= 0 || window.location.href.indexOf( '#' ) >= 0) {
		APP.director();
	}
	
	$('#topNav li.sect').on('click', function(){
		var page = $(this).attr('data-param'),
			parameters = 'section=' + page;

		$(this).addClass('active').siblings().removeClass('active');
		window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?' + parameters);
		APP.director();
	});

	// window.onhashchange = function() {
	// 	if (location.hash !== undefined && location.hash !== '') {
	// 		console.log(location.hash);
	// 		APP.director();
	// 		var dest = $(location.hash).offset().top;
	// 		$(document).scrollTop(dest);
	// 	} else {
	// 		console.log(window.location.search);
	// 		APP.director();
	// 	}
	// };

});

var APP = {

	director: function( ) {

		var section = window.location.search.substring( window.location.search.indexOf('?section=') + 9 );
		console.log(section);
		if ( $('section#'+section).length <= 0 ) {
			section = 'customize-your-cookware';
			window.history.replaceState('', document.title, window.location.origin + window.location.pathname + '?section=customize-your-cookware');
		}

		$('section').hide();
		$('section#'+section).show();
		$('#topNav li[data-param="'+section+'"]').addClass('active').siblings().removeClass('active');

	}

};