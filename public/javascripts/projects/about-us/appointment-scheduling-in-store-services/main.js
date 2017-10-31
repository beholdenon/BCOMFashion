'use strict';

require( [ "jquery", "cookie", "_cookieHelper" ], function ( $, Cookie, cookieHelper ) {

	$(document).ready(function(){

		var hasMBL = window.BLOOMIES.isMobile ? 'mbl: ' : '',
			cmPageID = "-appointment",
	        cmCategoryID = hasMBL + "Book_an_appointment",
			attributes = window.BLOOMIES.coremetrics.pageViewExploreAttributes,
			isLocalStorageAvailable = localStorageAvailable(),
			isSessionStorageAvailable = sessionStorageAvailable();

		attributes.add( { 48: checkUserStatus() } );

		window.BLOOMIES.coremetrics.cmCreatePageviewTag(cmCategoryID, hasMBL + 'ab-sh-xx-xx', "", "");

		$(".button").click(function(e) {
			fireCoremetrics($(e.target).data( "cm-link" ));
		});

		function fireCoremetrics(link) {
			window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + link + cmPageID, cmCategoryID);	
		}

        function checkUserStatus() {
        	return (cookieHelper.isSignedInUser() ? 'signed_in' : 'guest') +
              '|' + ((isLocalStorageAvailable && isSessionStorageAvailable) ? 'Y' : 'N') +
              '|' + (cookieHelper.isSoftSignedInUser() ? 'Soft sign in' : 'Not soft sign in');
        }

		function localStorageAvailable() {
		    try {
		      window.localStorage.setItem('app:test:storage', 'testval');
		      window.localStorage.removeItem('app:test:storage');
		      return true;
		    } catch (err) {
		      return false;
		    }
	  	}

  	  	function sessionStorageAvailable() {
		    try {
		      window.sessionStorage.setItem('app:test:storage', 'testval');
		      window.sessionStorage.removeItem('app:test:storage');
		      return true;
		    } catch (err) {
		      return false;
		    }
	  	}

	});
});