'use strict';

require( [ "jquery", "bcomCoremetrics", "bcomLeftNav/account/AccountLeftNav" ], function ( $, Coremetrics, accountLeftNav ) {
	accountLeftNav.render( '#bl_leftNavContainer', "ln_tol" );

	$(document).ready(function(){
		var cmPageID = "loyallist--top_of_list",
	        cmCategoryID = "Loyallist",
			pushAttrs;

	    Coremetrics.pageViewTag( {
			pageId: cmPageID,
			categoryId: cmCategoryID,
			searchTerm: "",
			searchResults: "",
			attributes: pushAttrs
	    } );

	    $(".toggle-disclaimer-icon").click(function(e) {
			e.preventDefault();
			var disclaimerIcon = $( '.toggle-disclaimer-icon' ),
	            disclaimerContent = $( '.lty-disclaimer-content' );

	        if ( disclaimerIcon.hasClass( 'expanded' ) ) {
	            disclaimerContent.slideUp();
	        } else {
	            disclaimerContent.slideDown();
	        }
	        disclaimerIcon.toggleClass( 'expanded' );
		});
	});
});
