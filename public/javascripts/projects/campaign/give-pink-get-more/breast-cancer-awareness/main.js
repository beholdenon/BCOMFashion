'use strict';

require( [ "jquery", "bcomCoremetrics", "propsConfig" ], function ( $, Coremetrics, props ) {

	$(document).ready(function(){

		var givePinkCoremetrics = 'fall17_give_pink',
			pushAttrs,
			breastCancerAwarenessCampaignEnabled = props.breastCancerAwarenessCampaignEnabled;

        //OFF by default, ON between 9/27 - 10/31
		if ( breastCancerAwarenessCampaignEnabled ) {
			//Hide OFF Content. Show ON Content
			$('#campaignOFF').addClass('hide');
		} else {
			//Hide ON Content. Show OFF Content
			$('#campaignON').addClass('hide');
		}

		$('#content').removeClass('hide');
		$('#loader-image').addClass('hide');

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
			window.open('//www.bloomingdales.com/service/credit/applynow/creditapp.ognc');
		});

	});
});