'use strict';

require( [ 'jquery', 'stringUtil', 'bcomCredit/views/SpeedBumpOverlay', 'bcomLeftNav/account/AccountLeftNav' ], function ( $, StringUtil, SpeedBumpOverlay, accountLeftNav ) {
    accountLeftNav.render( '#bl_leftNavContainer', "ln_loyallist" );  

	$(document).ready( function() {
    var learnMoreApplyLink = $("#learn-more-and-apply-link"),
        acquisitionValue = "MyPerksLnApply",
        sessionStorageValue = sessionStorage.getItem('acquisitionOrigin'),
        queryParamValue = StringUtil.getURLParameter('acquisitionOrigin');
      
    // Need to set the acquisitionOrigin value on the data-headers attribute for the 
    // learn & apply link for the campaign code project.
    // If there is a value in sessionStorage, then use that
    // Else if there is a query param passed, then use that and set sessionStorage to that value
    // Else use a default
    if (sessionStorageValue) {
      acquisitionValue = sessionStorageValue;
    } else if (queryParamValue) {
      acquisitionValue = queryParamValue;
      sessionStorage.setItem('acquisitionOrigin', queryParamValue);
    }
    
    learnMoreApplyLink.attr('data-headers', JSON.stringify({acquisitionOrigin: acquisitionValue}));
    
    SpeedBumpOverlay.init( $("#my-perks-bottom-container") );
    
		$('#learn-more-link').on('click', function () {
			if ($('.bl_mobile').length) {
				window.BLOOMIES.coremetrics.cmCreatePageElementTag('MBL: member_benefits-learn_more', 'MBL: Loyallist');
			} else {
				window.BLOOMIES.coremetrics.cmCreatePageElementTag('member_benefits-learn_more', 'Loyallist');
			}
		});
		$('#learn-more-and-apply-link').on('click', function() {
			window.cmCreateManualLinkClickTag($(this).data('cm_sp'));
		});
	});    
});