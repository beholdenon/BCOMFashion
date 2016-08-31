$(document).ready( function($) {

	'use strict';
    if($.fn.postContest()){
		$('a[coremetricTag="landing_sweepstakes"]').text("DESIGN YOUR OWN WORD");
		$('#row_landing_chic').find('.landing_description').text("Create your own exclusive word using artist Greg Lamarche’s letters and post it to Instagram—everyone should witness your brilliance.");
    }


	$( window ).load(function() {

		$.fn.coreTag('Pageview', 'fall16_100percent--landing');
	  
	});

});

