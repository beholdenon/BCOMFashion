'use strict';

require( [ 'jquery', 'bcomLeftNav/account/AccountLeftNav' ], function ( $, accountLeftNav ) {
    accountLeftNav.render( '#bl_leftNavContainer', "" );
    
	$(document).ready( function() {
		$('#learn-more-link').on('click', function () {
			if ($('.bl_mobile').length) {
				window.BLOOMIES.coremetrics.cmCreatePageElementTag('MBL: member_benefits-learn_more', 'MBL: Loyallist');
			} else {
				window.BLOOMIES.coremetrics.cmCreatePageElementTag('member_benefits-learn_more', 'Loyallist');
			}
		});
	});    
});