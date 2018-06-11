'use strict';

require( [ "jquery", "bcomCoremetrics", "aboutUsLeftNav" ], function ( $, Coremetrics, aboutUsLeftNav ) {
	aboutUsLeftNav.render( '#bl_leftNavContainer', "about_visitorServices" );

	$(document).ready(function(){
	    Coremetrics.pageViewTag( {
			pageId: "International ab-sh-xx-xx.international",
			categoryId: "ab-sh-xx-xx"
	    } );
	});
});
