'use strict';

require( [ "jquery", "bcomCoremetrics" ], function ( $, Coremetrics ) {

	$(document).ready(function(){

		var givePinkCoremetrics = 'fall17_give_pink',
			pushAttrs;

	    Coremetrics.pageViewTag( {
			pageId: givePinkCoremetrics,
			categoryId: givePinkCoremetrics,
			searchTerm: "",
			searchResults: "",
			attributes: pushAttrs
	    } );

		function createCoremetrics(pageId){
			Coremetrics.elementTag( {
				elementId: 'hp-'+pageId,
				categoryId: givePinkCoremetrics,
				attributes: pushAttrs
			});
		}

		$("#termsAndConditions").click(function() {
			createCoremetrics('TOC');
		});

			$("#enrollNow").click(function(e) {
			e.preventDefault();
			createCoremetrics('enroll_now');
			window.location.href = '//www.bloomingdales.com/loyallist/gpgmEnroll';
		});

		$("#applyNow").click(function(e) {
			e.preventDefault();
			createCoremetrics('apply_now');
			window.open('//www.bloomingdales.com/creditservice/marketing/main?cm_sp=hp-_-monetate-_-credit_applynow0821');
		});

	});
});